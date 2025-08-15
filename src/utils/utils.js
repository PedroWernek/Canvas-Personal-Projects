export const randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const distance = (x1, y1, x2, y2) => {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

export const hex2rgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // return {r, g, b}
  return { r, g, b };
};

export const handleResize = (canvas) => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

export const handleMouseMove = (event, canvas) => {
  return {
    x: event.clientX - canvas.offsetLeft,
    y: event.clientY,
  };
};
