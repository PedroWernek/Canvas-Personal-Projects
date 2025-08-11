export function setupCanvas() {
  const canvas = document.querySelector("canvas");
  const c = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();

  return { canvas, c };
}
