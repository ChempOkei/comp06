export const getRotatedBox = (rotation, size) => {
  const rad = (rotation * Math.PI) / 180;

  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));

  return {
    w: size.w * cos + size.h * sin,
    h: size.w * sin + size.h * cos,
  };
};
