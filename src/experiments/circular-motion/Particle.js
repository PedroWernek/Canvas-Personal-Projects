import { randomIntFromRange } from "../../utils/utils.js";

export class Particle {
  constructor(x, y, radius, color, mouse) {
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

  draw(lastPoint, partRadius, context) {
    //desenhando linhas ao inves de círculos
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = partRadius;
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(this.x, this.y);
    context.stroke();
    context.closePath();
  }

  update(partRadius, mouse, context) {
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
    this.draw(lastPoint, partRadius, context);
  }
}
