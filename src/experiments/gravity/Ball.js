// experiments/1-gravity/Ball.js

export default class Ball {
  constructor(x, y, velX, velY, radius, color, context, canvas) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.radius = radius;
    this.color = color;
    this.context = context; // O contexto 2D para desenhar
    this.canvas = canvas; // A referência ao elemento canvas
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
  }

  update(gravity, friction) {
    // Colisão com o chão
    if (this.y + this.radius + this.velY > this.canvas.height) {
      this.velY = -this.velY * friction;
      this.velX *= friction; // Atrito horizontal ao quicar
    } else {
      this.velY += gravity; // Aceleração da gravidade
    }

    // Colisão com as paredes laterais
    if (
      this.x + this.radius + this.velX > this.canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.velX = -this.velX;
    }

    // Atualiza as posições
    this.x += this.velX;
    this.y += this.velY;

    // Desenha a bola na nova posição
    this.draw();
  }
}
