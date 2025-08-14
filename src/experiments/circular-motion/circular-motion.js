import {
  randomIntFromRange,
  randomColor,
  handleResize,
  handleMouseMove,
} from "../../utils/utils.js";

export function run(canvas, context) {
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  const colors = ["#00bdff", "#4d39ce", "#088eff"];

  class Particle {
    constructor(x, y, radius, color) {
      //posição central
      this.x = x;
      this.y = y;

      this.radius = radius;
      this.color = color;
      this.radians = Math.random() * Math.PI * 2; // Random initial angle
      this.velocity = 0.05; // Speed of rotation
      this.distanceFromCenter = randomIntFromRange(50, 120); //randomizar a distancia do centro
      this.lastMousePoint = { x: mouse.x, y: mouse.y }; // ultima posição do mouse
    }

    draw(lastPoint, partRadius) {
      //desenhando linhas ao inves de círculos
      context.beginPath();
      context.strokeStyle = this.color;
      context.lineWidth = partRadius;
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(this.x, this.y);
      context.stroke();
      context.closePath();
    }

    update(partRadius) {
      //pegando o ultimo ponto central que o x e y dessa particula estava
      const lastPoint = { x: this.x, y: this.y };

      //fazendo um efeito de seguir devagar nosso mouse
      //pegando e atualizando o ultimo ponto central da partícula
      this.lastMousePoint.x += (mouse.x - this.lastMousePoint.x) * 0.05;
      this.lastMousePoint.y += (mouse.y - this.lastMousePoint.y) * 0.05;

      //girar a particula
      this.radians += this.velocity; // Adjust speed of rotation
      this.x =
        this.lastMousePoint.x +
        Math.cos(this.radians) * this.distanceFromCenter;
      this.y =
        this.lastMousePoint.y +
        Math.sin(this.radians) * this.distanceFromCenter;
      this.draw(lastPoint, partRadius);
    }
  }

  // Implementation
  let particles;
  function init() {
    handleResize(canvas);
    particles = [];

    for (let i = 0; i < 50; i++) {
      particles.push(
        new Particle(
          canvas.width / 2,
          canvas.height / 2,
          Math.random() * 2 + 1,
          randomColor(colors),
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
  addEventListener("mousedown", (e) => {
    partRadius += 1;
  });

  addEventListener("mouseup", (e) => {
    partRadius = 1;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    //cria o efeito de trilha
    context.fillStyle = "rgba(255, 255, 255, 0.09)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update(partRadius);
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
