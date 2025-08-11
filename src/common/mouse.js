const mouse = {
  x: window.innerWidth,
  y: window.innerHeight,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

export default mouse;
