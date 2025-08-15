import { randomIntFromRange, distance } from "../../utils/utils.js";
import utilElasticCollision from "../../utils/util-elastic-collision.js";

export class ParticleV2 {
  constructor(x, y, radius, color, mouse) {
    this.x = x;
    this.y = y;

    // Velocidade no formato esperado pela função de colisão
    this.velocity = {
      x: randomIntFromRange(-2, 2),
      y: 2,
    };

    this.radius = radius;
    this.size = radius;
    this.mass = 1; // Massa usada na equação de colisão
    this.color = color;

    // Controle do movimento orbital
    this.radians = Math.random() * Math.PI * 2;
    this.rotationSpeed = 0.05;
    this.distanceFromCenter = randomIntFromRange(50, 120);

    // Ponto de referência para movimento suave em relação ao mouse
    this.lastMousePoint = { x: mouse.x, y: mouse.y };

    // Estado para saber se já caiu no chão
    this.falling = false;
  }

  draw(lastPoint, partRadius, context, mouseDown) {
    if (this.falling) {
      // Modo físico: bolinha
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      context.fillStyle = this.color;
      context.fill();
      context.strokeStyle = "black";
      context.stroke();
      context.closePath();
    } else {
      // Modo orbital: linha
      context.beginPath();
      context.strokeStyle = this.color;
      context.lineWidth = partRadius;
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(this.x, this.y);
      context.stroke();
      context.closePath();
    }
  }

  update(partRadius, mouse, mouseDown, context, canvas, particles) {
    const lastPoint = { x: this.x, y: this.y };

    // Se o mouseDown for pressionado, mudamos para modo "queda"
    const saveSize = this.size;
    if (mouseDown) {
      this.falling = true;
      this.size = randomIntFromRange(1, 6); // Reinicia o ângulo para evitar saltos
    } else {
      this.falling = false;
      this.size = saveSize; // Restaura o ângulo salvo
    }

    if (!this.falling) {
      // Movimento orbital antes de cair
      this.lastMousePoint.x += (mouse.x - this.lastMousePoint.x) * 0.05;
      this.lastMousePoint.y += (mouse.y - this.lastMousePoint.y) * 0.05;

      this.radians += this.rotationSpeed;
      this.x =
        this.lastMousePoint.x +
        Math.cos(this.radians) * this.distanceFromCenter;
      this.y =
        this.lastMousePoint.y +
        Math.sin(this.radians) * this.distanceFromCenter;
    } else {
      // Movimento físico após cair

      // Gravidade
      if (this.y + this.radius + this.velocity.y > canvas.height) {
        this.velocity.y = -this.velocity.y * 0.9; // amortecimento
      } else {
        this.velocity.y += 0.9;
      }

      // Colisão com paredes
      if (
        this.x + this.radius + this.velocity.x > canvas.width ||
        this.x - this.radius <= 0
      ) {
        this.velocity.x = -this.velocity.x;
      }

      // Colisão com outras partículas
      for (let i = 0; i < particles.length; i++) {
        if (this === particles[i]) continue;

        let dist = distance(this.x, this.y, particles[i].x, particles[i].y);

        if (dist - this.radius * 2 < 0) {
          utilElasticCollision.resolveCollision(this, particles[i]);
        }
      }

      // Atualiza posição
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }

    this.draw(lastPoint, partRadius, context, mouseDown);
  }
}
