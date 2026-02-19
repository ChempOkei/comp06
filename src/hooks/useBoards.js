import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";

export const useBoards = () => {
  const [accessBoards, setAccessBoards] = useState([]);
  const [publicBoards, setPublicBoards] = useState([]);
  const { token, user } = useAuth();

  const getPublicBoards = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/boards/public/list", {
        method: "GET",
        headers: {
          clientId: user.email,
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const data = await res.json();

        return setPublicBoards(data);
      }
      throw new Error("Ошибка получения досок");
    } catch (err) {
      alert(err.message);
    }
  }, [user, token]);

  const getAccessBoards = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/boards/my", {
        method: "GET",
        headers: {
          clientId: user.email,
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const data = await res.json();

        return setAccessBoards(data);
      }

      throw new Error("Ошибка получения досок");
    } catch (err) {
      alert(err.message);
    }
  }, [user, token]);

  const createBoard = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          clientId: user.email,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: prompt("Введите название доски") }),
      });

      if (res.status === 201) {
        const data = await res.json();

        setAccessBoards((prev) => [...prev, data]);
        return alert(`Доска ${data.title} успешно создана`);
      }

      throw new Error("Ошибка создания доски");
    } catch (err) {
      alert(err.message);
    }
  }, [user, token]);

  const publishBoard = useCallback(
    async (boardId) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/boards/${boardId}/public`,
          {
            method: "POST",
            headers: {
              clientId: user.email,
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.status === 200) {
          const data = await res.json();

          setAccessBoards((prev) =>
            prev.map((board) =>
              boardId === board.id
                ? { ...board, is_public: 1, public_hash: data.public_hash }
                : board,
            ),
          );
          return alert(
            `Доска успешно опубликована: /board/${data.public_hash}`,
          );
        }

        throw new Error("Ошибка публикации доски");
      } catch (err) {
        alert(err.message);
      }
    },
    [user, token],
  );

  const likeBoard = useCallback(
    async (boardId) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/boards/${boardId}/like`,
          {
            method: "POST",
            headers: {
              clientId: user.email,
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.status === 200) {
          setAccessBoards((prev) =>
            prev.map((board) =>
              boardId === board.id
                ? {
                    ...board,
                    is_liked: +!board.is_liked,
                    likes_count: board.is_liked
                      ? board.likes_count - 1
                      : board.likes_count + 1,
                  }
                : board,
            ),
          );
          return setPublicBoards((prev) =>
            prev.map((board) =>
              boardId === board.id
                ? {
                    ...board,
                    is_liked: +!board.is_liked,
                    likes_count: board.is_liked
                      ? board.likes_count - 1
                      : board.likes_count + 1,
                  }
                : board,
            ),
          );
        }

        throw new Error("Ошибка лайков");
      } catch (err) {
        alert(err.message);
      }
    },
    [user, token],
  );

  const shareAccess = useCallback(
    async (boardId) => {
      const email = prompt("Введите email:");

      if (!email.match(/^\S+@\S+\.\S{2,}$/)) return alert("email не валидный");

      try {
        const res = await fetch(
          `http://localhost:3000/api/boards/${boardId}/access`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              clientId: user.email,
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email }),
          },
        );

        if (res.status === 200) {
          return alert("Доступ успешно предоставлен");
        }

        if (res.status === 400) {
          return alert("Пользователь уже имеет доступ к доске");
        }

        if (res.status === 404) {
          return alert("Пользователь не найден");
        }

        throw new Error("Ошибка предоставления доступа");
      } catch (err) {
        alert(err.message);
      }
    },
    [user, token],
  );

  return {
    getPublicBoards,
    accessBoards,
    createBoard,
    publicBoards,
    getAccessBoards,
    publishBoard,
    likeBoard,
    shareAccess,
  };
};
