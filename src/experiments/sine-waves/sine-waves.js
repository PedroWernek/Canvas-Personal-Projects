import { handleResize } from "../../utils/utils";

export function run(canvas, context) {
  window.addEventListener("resize", () => {
    handleResize(canvas);
  });

  function init() {
    handleResize(canvas);
  }

  function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(0, canvas.height / 2);

    for (let i = 0; i < canvas.width; i++) {
      context.lineTo(i, canvas.height / 2 + Math.sin(i));
      context.stroke();
    }
  }

  init();
  animate();

  return () => {
    cancelAnimationFrame(animate);
    removeEventListener("resize", handleResize);
  };
}
