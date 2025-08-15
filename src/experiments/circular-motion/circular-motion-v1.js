import {
  randomColor,
  handleResize,
  handleMouseMove,
} from "../../utils/utils.js";
import { ParticleV1 } from "./Particle-v1.js";

export function runV1(canvas, context) {
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  let partRadius = 1;
  const colors = ["#00bdff", "#4d39ce", "#088eff"];

  // Implementation
  let particles;
  function init() {
    handleResize(canvas);
    particles = [];

    for (let i = 0; i < 50; i++) {
      particles.push(
        new ParticleV1(
          canvas.width / 2,
          canvas.height / 2,
          Math.random() * 2 + 1,
          randomColor(colors),
          mouse,
        ),
      );
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

  const onMouseDown = () => {
    partRadius += 1;
  };

  const onMouseUp = () => {
    partRadius = 1;
  };

  addEventListener("mousemove", onMouseMove);
  addEventListener("resize", onResize);
  addEventListener("mousedown", onMouseDown);
  addEventListener("mouseup", onMouseUp);

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    //cria o efeito de trilha
    context.fillStyle = "rgba(255, 255, 255, 0.09)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update(partRadius, mouse, context);
    });
  }

  init();
  animate();

  return () => {
    cancelAnimationFrame(animate);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mouseup", onMouseUp);
  };
}
