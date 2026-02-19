import { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { getRotatedBox } from "../../utils/getRotatedBox";
import { BoardObject } from "../../components/Object/BoardObject";
import { HeaderContext } from "../../context/HeaderContext";

const BOARD = { w: 1600, h: 900 };

export const BoardPage = ({ publicBoard = false }) => {
  const wsRef = useRef();
  const { setTitle } = useContext(HeaderContext);
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { boardId, boardHash } = useParams();
  const [focused, setFocused] = useState(null);
  const [remoteFocused, setRemoteFocused] = useState({});
  const [objects, setObjects] = useState([]);
  const [selected, setSelected] = useState("rectangle");
  const [text, setText] = useState("");
  const [action, setAction] = useState(null);

  const wsSend = (event, data) =>
    wsRef.current?.send(JSON.stringify({ event, data }));

  useEffect(() => {
    const ws = new WebSocket(
      publicBoard
        ? `ws://localhost:3000?clientId=${Math.random()}`
        : `ws://localhost:3000?clientId=${user.email}&token=${token}`,
    );

    if (publicBoard) {
      fetch(`http://localhost:3000/api/boards/public/${boardHash}`, {
        method: "GET",
        headers: {
          clientId: Math.random(),
        },
      }).then((res) => {
        if (res.status === 404) {
          alert("Доска не найдена");
          navigate("/");
        }
      });
    }

    wsRef.current = ws;

    ws.onopen = () =>
      ws.send(
        JSON.stringify({
          event: "join_board",
          data: publicBoard
            ? {
                boardHash: boardHash,
              }
            : {
                boardId: boardId,
              },
        }),
      );

    ws.onmessage = (ev) => {
      const { event, data } = JSON.parse(ev.data);

      const handlers = {
        board_state: () => {
          (setObjects(data.objects),
            setRemoteFocused(
              Object.fromEntries(
                data.focuses.map((focus) => [focus.objectId, focus.userName]),
              ),
            ));
          setTitle(data.board.title);
        },
        focus_success: () => setFocused(data.objectId),
        object_focused: () =>
          setRemoteFocused((prev) => ({
            ...prev,
            [data.objectId]: data.userName,
          })),
        object_deleted: () =>
          setObjects((prev) => prev.filter((obj) => obj.id !== data.objectId)),
        object_created: () => setObjects((prev) => [...prev, data]),
        error: () => {
          if (data.message === "Board not found or access denied") {
            alert("Доска не найдена");
            navigate("/");
          }
        },
        object_unfocused: () => {
          setRemoteFocused((prev) => {
            const copy = { ...prev };
            delete copy[data.objectId];
            return copy;
          });
          data.data &&
            setObjects((prev) =>
              prev.map((obj) =>
                obj.id === data.objectId
                  ? { type: obj.type, ...data, id: obj.id }
                  : obj,
              ),
            );
        },
      };

      handlers[event]?.();
    };

    return () => setTimeout(() => ws.close(), 300);
  }, [user, token, boardId, boardHash, publicBoard, setTitle, navigate]);

  const handleMove = (e) => {
    if (!action) return;

    setObjects((prev) =>
      prev.map((obj) => {
        if (obj.id !== focused) return obj;

        if (action.type === "drag") {
          const nextX = e.clientX - action.offset.x;
          const nextY = e.clientY - action.offset.y;

          const box = getRotatedBox(obj.data.rotation, obj.data.size);

          return {
            ...obj,
            data: {
              ...obj.data,
              pos: {
                x: Math.max(box.w, Math.min(BOARD.w - box.w, nextX)),
                y: Math.max(box.h, Math.min(BOARD.h - box.h, nextY)),
              },
            },
          };
        }

        if (action.type == "resize") {
          const dx = e.clientX - action.offset.x;
          const dy = e.clientY - action.offset.y;

          const rad = (-obj.data.rotation * Math.PI) / 180;
          const lx = dx * Math.cos(rad) - dy * Math.sin(rad);
          const ly = dx * Math.sin(rad) + dy * Math.cos(rad);

          const size = {};

          if (obj.type === "image") {
            const aspectRatio = action.startSize.w / action.startSize.h;

            size.w = Math.max(10, action.startSize.w + lx);
            size.h = Math.max(10, (action.startSize.w + lx) / aspectRatio);
          } else {
            size.w = Math.max(10, action.startSize.w + lx);
            size.h = Math.max(10, action.startSize.h + ly);
          }

          const box = getRotatedBox(obj.data.rotation, size);

          return {
            ...obj,
            data: {
              ...obj.data,
              size: size,
              pos: {
                x: Math.max(box.w, Math.min(BOARD.w - box.w, obj.data.pos.x)),
                y: Math.max(box.h, Math.min(BOARD.h - box.h, obj.data.pos.y)),
              },
            },
          };
        }

        if (action.type === "rotation") {
          const angle =
            Math.atan2(
              e.clientY - action.center.y,
              e.clientX - action.center.x,
            ) *
            (180 / Math.PI);

          const nextRotation = action.startRotation + angle - action.startAngle;

          const box = getRotatedBox(obj.data.rotation, obj.data.size);

          return {
            ...obj,
            data: {
              ...obj.data,
              rotation: nextRotation,
              pos: {
                x: Math.max(box.w, Math.min(BOARD.w - box.w, obj.data.pos.x)),
                y: Math.max(box.h, Math.min(BOARD.h - box.h, obj.data.pos.y)),
              },
            },
          };
        }
        return obj;
      }),
    );
  };

  return (
    <main>
      {publicBoard ? (
        <div>Нет прав на редактирование</div>
      ) : (
        <div>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value="rectangle">Прямоугольник</option>
            <option value="circle">Круг</option>
            <option value="text">Текст</option>
            <option value="line">Линия</option>
            <option value="image">Картинка</option>
          </select>
          <button
            onClick={() => {
              if (selected === "image") {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";

                input.onchange = (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();

                  reader.onload = () => {
                    const image = new Image();
                    image.src = reader.result;

                    image.onload = () => {
                      const aspectRatio = image.width / image.height;

                      wsSend("create_object", {
                        type: "image",
                        data: {
                          pos: { x: 200, y: 200 },
                          size: { w: 100, h: 100 / aspectRatio },
                          rotation: 0,
                          img: reader.result,
                        },
                      });
                    };
                  };

                  reader.readAsDataURL(file);
                };

                input.click();
              } else if (selected === "text") {
                if (!text) {
                  return alert("Текст не может быть пустым");
                }
                wsSend("create_object", {
                  type: "text",
                  data: {
                    text,
                    pos: { x: 200, y: 200 },
                    size: { w: 100, h: 100 },
                    rotation: 0,
                  },
                });
              } else
                wsSend("create_object", {
                  type: selected,
                  data: {
                    pos: { x: 200, y: 200 },
                    size: { w: 100, h: 100 },
                    rotation: 0,
                  },
                });
            }}
          >
            Создать
          </button>
          {selected === "text" && (
            <input
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Введите текст..."
            />
          )}
          {focused && (
            <button
              onClick={() => wsSend("delete_object", { objectId: focused })}
            >
              Удалить
            </button>
          )}
        </div>
      )}
      <svg
        onPointerMove={handleMove}
        onPointerUp={() => {
          if (action) setAction(null);
        }}
        width={BOARD.w}
        height={BOARD.h}
        style={{ border: "1px solid black" }}
        onPointerDown={() => {
          wsSend("unfocus_object", {
            objectId: focused,
            ...objects.find((obj) => obj.id === focused),
          });
          setFocused(null);
        }}
      >
        {objects.map((obj) => (
          <BoardObject
            obj={obj}
            focused={focused}
            remoteFocused={remoteFocused}
            key={obj.id}
            onPointerDown={(e) => {
              e.stopPropagation();
              if (!remoteFocused[obj.id])
                if (focused === obj.id) {
                  setAction({
                    type: "drag",
                    id: obj.id,
                    offset: {
                      x: e.clientX - obj.data.pos.x,
                      y: e.clientY - obj.data.pos.y,
                    },
                  });
                } else wsSend("focus_object", { objectId: obj.id });
            }}
            onRotationDown={(e) => {
              e.stopPropagation();
              if (!remoteFocused[obj.id])
                if (focused === obj.id) {
                  const startAngle =
                    Math.atan2(
                      e.clientY - obj.data.pos.y,
                      e.clientX - obj.data.pos.x,
                    ) *
                    (180 / Math.PI);

                  setAction({
                    type: "rotation",
                    id: obj.id,
                    startAngle,
                    center: obj.data.pos,
                    startRotation: obj.data.rotation,
                  });
                } else wsSend("focus_object", { objectId: obj.id });
            }}
            onResizeDown={(e) => {
              e.stopPropagation();
              if (!remoteFocused[obj.id])
                if (focused === obj.id) {
                  setAction({
                    type: "resize",
                    id: obj.id,
                    offset: {
                      x: e.clientX,
                      y: e.clientY,
                    },
                    startSize: obj.data.size,
                  });
                } else wsSend("focus_object", { objectId: obj.id });
            }}
          />
        ))}
      </svg>
    </main>
  );
};
