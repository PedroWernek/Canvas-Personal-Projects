import { distance } from "../../utils/utils.js";
import utilElasticCollision from "../../utils/util-elastic-collision.js";

export default class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5,
    };
    this.radius = radius;
    this.color = color;
    this.mass = 1; // Assuming a default mass of 1 for simplicity
    this.opacity = 0;
  }

  update(context, particles, mouse) {
    this.draw(context);

    for (let i = 0; i < particles.length; i++) {
      //evitar que ela cheque ela mesma
      if (this === particles[i]) continue;
      let dist = distance(this.x, this.y, particles[i].x, particles[i].y);
      // context.beginPath();
      // context.font = "20px Arial";
      // context.fillText(`distance: ${Math.floor(distance)}`, this.x - 50, this.y - 10);
      // context.moveTo(this.x, this.y);
      // context.lineTo(particles[i].x, particles[i].y);
      // context.strokeStyle = "black";
      // context.stroke();
      // context.closePath();

      //verificar se a distancia entre ela e as outras partículas
      if (dist - this.radius * 2 < 0) {
        utilElasticCollision.resolveCollision(this, particles[i]);
      }
    }

    if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
      this.velocity.y = -this.velocity.y;
    }

    //verifica se o mouse está perto da partícula
    if (distance(mouse.x, mouse.y, this.x, this.y) < 50 && this.opacity < 0.2) {
      this.opacity += 0.02;
    } else if (this.opacity > 0) {
      this.opacity -= 0.02;

      this.opacity = Math.max(0, this.opacity);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.save();
    context.globalAlpha = this.opacity;
    context.fillStyle = this.color;
    context.fill();
    context.restore();
    context.strokeStyle = this.color;
    context.stroke();
    context.closePath();
  }
}
