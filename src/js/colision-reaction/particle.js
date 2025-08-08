import utils from "./utils.js";
import utilElasticCollision from "./js/util-elastic-collision.js";

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

  update(c, particles, mouse) {
    this.draw(c);

    for (let i = 0; i < particles.length; i++) {
      //evitar que ela cheque ela mesma
      if (this === particles[i]) continue;
      let distance = utils.distance(
        this.x,
        this.y,
        particles[i].x,
        particles[i].y,
      );
      // c.beginPath();
      // c.font = "20px Arial";
      // c.fillText(`distance: ${Math.floor(distance)}`, this.x - 50, this.y - 10);
      // c.moveTo(this.x, this.y);
      // c.lineTo(particles[i].x, particles[i].y);
      // c.strokeStyle = "black";
      // c.stroke();
      // c.closePath();

      //verificar se a distancia entre ela e as outras partículas
      if (distance - this.radius * 2 < 0) {
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
    if (
      utils.distance(mouse.x, mouse.y, this.x, this.y) < 50 &&
      this.opacity < 0.2
    ) {
      this.opacity += 0.02;
    } else if (this.opacity > 0) {
      this.opacity -= 0.02;

      this.opacity = Math.max(0, this.opacity);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }
}
