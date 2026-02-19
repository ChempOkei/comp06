export const BoardObject = ({
  obj,
  onPointerDown,
  onRotationDown,
  onResizeDown,
  focused,
  remoteFocused,
}) => {
  const shapes = {
    rectangle: () => (
      <g
        transform={`rotate(${obj.data.rotation} ${obj.data.pos.x} ${obj.data.pos.y})`}
      >
        {remoteFocused[obj.id] && (
          <text
            fill="#00f"
            x={obj.data.pos.x}
            y={obj.data.pos.y - obj.data.size.h - 40}
            fontSize={20}
            textAnchor="middle"
          >
            {remoteFocused[obj.id]}
          </text>
        )}
        <rect
          x={obj.data.pos.x - obj.data.size.w}
          y={obj.data.pos.y - obj.data.size.h}
          width={obj.data.size.w * 2}
          height={obj.data.size.h * 2}
          fill="#000"
          onPointerDown={onPointerDown}
          stroke={
            focused === obj.id
              ? "#f00"
              : remoteFocused[obj.id]
                ? "#00f"
                : "#000"
          }
          strokeWidth={2}
        />
        <circle
          strokeWidth={1}
          stroke="#000"
          fill="#fff"
          r={8}
          cx={obj.data.pos.x + obj.data.size.w}
          cy={obj.data.pos.y + obj.data.size.h}
          onPointerDown={onResizeDown}
        />
        <circle
          strokeWidth={1}
          stroke="#000"
          fill="#fff"
          r={8}
          cx={obj.data.pos.x}
          cy={obj.data.pos.y - obj.data.size.h - 20}
          onPointerDown={onRotationDown}
        />
      </g>
    ),
    line: () => (
      <g
        transform={`rotate(${obj.data.rotation} ${obj.data.pos.x} ${obj.data.pos.y})`}
      >
        {remoteFocused[obj.id] && (
          <text
            fill="#00f"
            x={obj.data.pos.x}
            y={obj.data.pos.y - obj.data.size.h - 40}
            fontSize={20}
            textAnchor="middle"
          >
            {remoteFocused[obj.id]}
          </text>
        )}
        <line
          x1={obj.data.pos.x - obj.data.size.w}
          y1={obj.data.pos.y + obj.data.size.h}
          x2={obj.data.size.w - obj.data.size.w}
          y2={obj.data.size.h + obj.data.size.h}
          fill="#000"
          onPointerDown={onPointerDown}
          stroke={
            focused === obj.id
              ? "#f00"
              : remoteFocused[obj.id]
                ? "#00f"
                : "#000"
          }
          strokeWidth={2}
        />
        <circle
          strokeWidth={1}
          stroke="#000"
          fill="#fff"
          r={8}
          cx={obj.data.pos.x + obj.data.size.w}
          cy={obj.data.pos.y + obj.data.size.h}
          onPointerDown={onResizeDown}
        />
        <circle
          strokeWidth={1}
          stroke="#000"
          fill="#fff"
          r={8}
          cx={obj.data.pos.x}
          cy={obj.data.pos.y - obj.data.size.h - 20}
          onPointerDown={onRotationDown}
        />
      </g>
    ),
    circle: () => (
      <g
        transform={`rotate(${obj.data.rotation} ${obj.data.pos.x} ${obj.data.pos.y})`}
      >
        {remoteFocused[obj.id] && (
          <text
            fill="#00f"
            x={obj.data.pos.x}
            y={obj.data.pos.y - obj.data.size.h - 40}
            fontSize={20}
            textAnchor="middle"
          >
            {remoteFocused[obj.id]}
          </text>
        )}
        <ellipse
          cx={obj.data.pos.x}
          cy={obj.data.pos.y}
          rx={obj.data.size.w}
          ry={obj.data.size.h}
          fill="#000"
          onPointerDown={onPointerDown}
          stroke={
            focused === obj.id
              ? "#f00"
              : remoteFocused[obj.id]
                ? "#00f"
                : "#000"
          }
          strokeWidth={2}
        />
        <circle
          strokeWidth={1}
          stroke="#000"
          fill="#fff"
          r={8}
          cx={obj.data.pos.x + obj.data.size.w}
          cy={obj.data.pos.y + obj.data.size.h}
          onPointerDown={onResizeDown}
        />
        <circle
          strokeWidth={1}
          stroke="#000"
          fill="#fff"
          r={8}
          cx={obj.data.pos.x}
          cy={obj.data.pos.y - obj.data.size.h - 20}
          onPointerDown={onRotationDown}
        />
      </g>
    ),
    text: () => (
      <g
        transform={`rotate(${obj.data.rotation} ${obj.data.pos.x} ${obj.data.pos.y})`}
      >
        {remoteFocused[obj.id] && (
          <text
            fill="#00f"
            x={obj.data.pos.x}
            y={obj.data.pos.y - obj.data.size.h - 40}
            fontSize={20}
            textAnchor="middle"
          >
            {remoteFocused[obj.id]}
          </text>
        )}
        <text
          x={obj.data.pos.x - obj.data.size.w}
          y={obj.data.pos.y}
          fill="#000"
          onPointerDown={onPointerDown}
          fontSize={obj.data.size.h}
          textLength={obj.data.size.w * 2}
          style={{ userSelect: "none" }}
          stroke={
            focused === obj.id
              ? "#f00"
              : remoteFocused[obj.id]
                ? "#00f"
                : "#000"
          }
          strokeWidth={2}
        >
          {obj.data.text}
        </text>
        <circle
          strokeWidth={1}
          stroke="#000"
          fill="#fff"
          r={8}
          cx={obj.data.pos.x + obj.data.size.w}
          cy={obj.data.pos.y + obj.data.size.h}
          onPointerDown={onResizeDown}
        />
        <circle
          strokeWidth={1}
          stroke="#000"
          fill="#fff"
          r={8}
          cx={obj.data.pos.x}
          cy={obj.data.pos.y - obj.data.size.h - 20}
          onPointerDown={onRotationDown}
        />
      </g>
    ),
    image: () => (
      <g
        transform={`rotate(${obj.data.rotation} ${obj.data.pos.x} ${obj.data.pos.y})`}
      >
        {remoteFocused[obj.id] && (
          <text
            fill="#00f"
            x={obj.data.pos.x}
            y={obj.data.pos.y - obj.data.size.h - 40}
            fontSize={20}
            textAnchor="middle"
          >
            {remoteFocused[obj.id]}
          </text>
        )}
        <image
          href={obj.data.img}
          x={obj.data.pos.x - obj.data.size.w}
          y={obj.data.pos.y - obj.data.size.h}
          width={obj.data.size.w * 2}
          height={obj.data.size.h * 2}
          fill="#000"
          onPointerDown={onPointerDown}
          strokeWidth={2}
        />
        <rect
          x={obj.data.pos.x - obj.data.size.w}
          y={obj.data.pos.y - obj.data.size.h}
          width={obj.data.size.w * 2}
          height={obj.data.size.h * 2}
          fill="none"
          stroke={
            focused === obj.id
              ? "#f00"
              : remoteFocused[obj.id]
                ? "#00f"
                : "#000"
          }
          strokeWidth={2}
        />
        <circle
          strokeWidth={1}
          stroke="#000"
          fill="#fff"
          r={8}
          cx={obj.data.pos.x + obj.data.size.w}
          cy={obj.data.pos.y + obj.data.size.h}
          onPointerDown={onResizeDown}
        />
        <circle
          strokeWidth={1}
          stroke="#000"
          fill="#fff"
          r={8}
          cx={obj.data.pos.x}
          cy={obj.data.pos.y - obj.data.size.h - 20}
          onPointerDown={onRotationDown}
        />
      </g>
    ),
  };

  return shapes[obj.type]();
};
