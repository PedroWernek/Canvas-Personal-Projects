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
  }

  init();
  animate();

  return () => {
    cancelAnimationFrame(animate);
    removeEventListener("resize", handleResize);
  };
}
