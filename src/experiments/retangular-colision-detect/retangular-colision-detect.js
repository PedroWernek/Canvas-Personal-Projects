import { handleResize, handleMouseMove } from "../../utils/utils.js";

export function run(canvas, context) {
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

  // Implementation
  let objects;
  function init() {
    handleResize(canvas);
    objects = [];
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    //fundo
    context.fillStyle = "#1A1A23";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (
      mouse.x + 100 >= canvas.width / 2 - 50 &&
      mouse.x <= canvas.width / 2 - 50 + 100 &&
      mouse.y + 100 >= canvas.height / 2 - 50 &&
      mouse.y <= canvas.height / 2 - 50 + 100
    ) {
      context.font = "48px ComicSans"; // Set font size and family
      context.fillStyle = "#92ABEA"; // Set text color
      context.textAlign = "center"; // Align text horizontally
      context.textBaseline = "middle"; // Align text vertically
      context.fillText("Colidiu!", canvas.width / 2, canvas.height / 2 / 2);
    }
    //retangulo 1
    context.fillStyle = "#E86262";
    context.fillRect(mouse.x, mouse.y, 100, 100);

    context.fillStyle = "#92ABEA";
    context.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);
  }

  const onMouseMove = (e) => {
    const mouseHandler = handleMouseMove(e, canvas);
    mouse.x = mouseHandler.x - 50;
    mouse.y = mouseHandler.y - 50;
  };

  const onResize = () => {
    init();
  };

  // 2. Adicione os listeners usando as referências
  addEventListener("mousemove", onMouseMove);
  addEventListener("resize", onResize);

  init();
  animate();

  return () => {
    cancelAnimationFrame(animate);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("resize", onResize);
  };
}
