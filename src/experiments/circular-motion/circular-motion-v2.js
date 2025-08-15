import {
  randomColor,
  handleResize,
  handleMouseMove,
} from "../../utils/utils.js";
import { ParticleV2 } from "./Particle-v2.js";

export function runV2(canvas, context) {
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  const colors = ["#00bdff", "#4d39ce", "#088eff"];

  // Implementation
  let particles;
  function init() {
    handleResize(canvas);
    particles = [];

    for (let i = 0; i < 50; i++) {
      particles.push(
        new ParticleV2(
          canvas.width / 2,
          canvas.height / 2,
          Math.random() * 2 + 1,
          randomColor(colors),
          mouse,
        ),
      );
    }
  }

  // Event Listeners
  addEventListener("mousemove", (e) => {
    const mouseHandler = handleMouseMove(e, canvas);
    mouse.x = mouseHandler.x;
    mouse.y = mouseHandler.y;
  });

  addEventListener("resize", () => {
    init();
  });

  let partRadius = 1;
  let mouseDown = false;
  addEventListener("mousedown", (e) => {
    partRadius += 2;
    mouseDown = true;
  });

  addEventListener("mouseup", (e) => {
    partRadius = 1;
    mouseDown = false;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    //cria o efeito de trilha
    context.fillStyle = "rgba(255, 255, 255, 0.09)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update(partRadius, mouse, mouseDown, context, canvas, particles);
    });
  }

  init();
  animate();

  return () => {
    cancelAnimationFrame(animate);
    window.removeEventListener("mousemove", (e) => {
      const mouseHandler = handleMouseMove(e, canvas);
      mouse.x = mouseHandler.x;
      mouse.y = mouseHandler.y;
    });
    window.removeEventListener("resize", init);
    window.removeEventListener("mousedown", () => {
      partRadius += 1;
    });
    window.removeEventListener("mouseup", () => {
      partRadius = 1;
    });
  };
}
