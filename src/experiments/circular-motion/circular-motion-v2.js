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
  let particles;
  let animationId; // Para guardar o ID da animação
  let mouseDown = false;
  let partRadius = 1;

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

  // Funções de evento nomeadas
  const onMouseMove = (e) => {
    const mouseHandler = handleMouseMove(e, canvas);
    mouse.x = mouseHandler.x;
    mouse.y = mouseHandler.y;
  };

  const onResize = () => {
    init();
  };

  const onMouseDown = () => {
    partRadius += 2;
    mouseDown = true;
  };

  const onMouseUp = () => {
    partRadius = 1;
    mouseDown = false;
  };

  // Adiciona os listeners
  addEventListener("mousemove", onMouseMove);
  addEventListener("resize", onResize);
  addEventListener("mousedown", onMouseDown);
  addEventListener("mouseup", onMouseUp);

  function animate() {
    animationId = requestAnimationFrame(animate);

    context.fillStyle = "rgba(255, 255, 255, 0.09)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update(partRadius, mouse, mouseDown, context, canvas, particles);
    });
  }

  init();
  animate();

  // Função de limpeza
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mouseup", onMouseUp);
  };
}
