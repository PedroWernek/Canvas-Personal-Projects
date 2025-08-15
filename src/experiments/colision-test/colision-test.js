import { handleResize, handleMouseMove } from "../../utils/utils.js";
import { Circle } from "./Circle";

export function run(canvas, context) {
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

  function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }

  // Implementation
  let circle1;
  let circle2;
  // let objects = [circle1, circle2];

  function init() {
    handleResize(canvas);
    // objects = [];
    circle1 = new Circle(innerWidth / 2, innerHeight / 2, 200, "black");
    circle2 = new Circle(400, 400, 50, "red");
    for (let i = 0; i < 400; i++) {
      // objects.push()
    }
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    circle1.update(context);
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update(context);
    if (
      getDistance(circle1.x, circle1.y, circle2.x, circle2.y) >
      circle1.radius + circle2.radius
    ) {
      circle1.color = "black";
    } else {
      circle1.color = "red";
    }
  }

  const onMouseMove = (e) => {
    const mouseHandler = handleMouseMove(e, canvas);
    mouse.x = mouseHandler.x;
    mouse.y = mouseHandler.y;
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
