import utils from "../utils.js";

import setupCanvas from "../../common/canvas-setup.js";

const { canvas, c } = setupCanvas();

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#00bdff", "#4d39ce", "#088eff"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

let partRadius = 1;
addEventListener("mousedown", (e) => {
  partRadius += 1;
});

addEventListener("mouseup", (e) => {
  partRadius = 1;
});

class Particle {
  constructor(x, y, radius, color) {
    //posição central
    this.x = x;
    this.y = y;

    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2; // Random initial angle
    this.velocity = 0.05; // Speed of rotation
    this.distanceFromCenter = utils.randomIntFromRange(50, 120); //randomizar a distancia do centro
    this.lastMousePoint = { x: x, y: y }; // ultima posição do mouse
  }

  draw(lastPoint, partRadius) {
    //desenhando linhas ao inves de círculos
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = partRadius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
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
      this.lastMousePoint.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y =
      this.lastMousePoint.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint, partRadius);
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push(
      new Particle(
        canvas.width / 2,
        canvas.height / 2,
        Math.random() * 2 + 1,
        utils.randomColor(colors),
      ),
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  //cria o efeito de trilha
  c.fillStyle = "rgba(255, 255, 255, 0.09)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update(partRadius);
  });
}

init();
animate();
