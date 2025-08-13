import { randomIntFromRange, randomColor } from "../../utils/utils.js";
import Ball from "./Ball.js";

// A função 'run' é o ponto de entrada que será chamado pelo loader principal
export function run(canvas, context) {
  const c = context;
  let animationFrameId;

  // --- Constantes do "Mundo" ---
  const GRAVITY = 1;
  const FRICTION = 0.8;
  const COLORS = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];
  let ballArray = [];

  // --- Funções ---
  function init() {
    handleResize();
    ballArray = [];
    for (let i = 0; i < 100; i++) {
      const radius = randomIntFromRange(10, 30);
      const x = randomIntFromRange(radius, canvas.width - radius);
      const y = randomIntFromRange(0, canvas.height - radius * 2); // Nasce mais para cima
      const velX = randomIntFromRange(-2, 2);
      ballArray.push(
        new Ball(x, y, velX, 2, radius, randomColor(COLORS), c, canvas),
      );
    }
  }

  // A função animate não precisa de argumentos aqui
  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Passa as constantes do mundo para o método update de cada bola
    ballArray.forEach((ball) => ball.update(GRAVITY, FRICTION));
  }

  // --- Listeners de Evento ---
  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const handleClick = () => init();

  window.addEventListener("resize", handleResize);
  window.addEventListener("click", handleClick);

  // --- Inicialização ---
  init();
  animate();

  // --- Função de Limpeza ---
  return function cleanup() {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("click", handleClick);
    c.clearRect(0, 0, canvas.width, canvas.height);
  };
}
