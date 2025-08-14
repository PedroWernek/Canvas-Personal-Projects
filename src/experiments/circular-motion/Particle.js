class Particle {
  constructor(x, y, radius, color) {
    //posição central
    this.x = x;
    this.y = y;
    this.velX = (Math.random() - 0.5) * 2; // velocidade horizontal
    this.velY = (Math.random() - 0.5) * 2;
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
    if (!mouseDown) {
      this.x =
        this.lastMousePoint.x +
        Math.cos(this.radians) * this.distanceFromCenter;
      this.y =
        this.lastMousePoint.y +
        Math.sin(this.radians) * this.distanceFromCenter;
    } else {
      this.radians += 0.05; // Increase rotation speed when mouse is down
      // Colisão com o chão
      if (this.y + this.radius + this.velY > canvas.height) {
        this.velY = -this.velY * 1;
        this.velX *= 0.2; // Atrito horizontal ao quicar
      } else {
        this.velY += 0.9; // Aceleração da gravidade
      }

      // Colisão com as paredes laterais
      if (
        this.x + this.radius + this.velX > canvas.width ||
        this.x - this.radius <= 0
      ) {
        this.velX = -this.velX;
      }

      // Atualiza as posições
      this.x += this.velX;
      this.y += this.velY;
    }

    this.draw(lastPoint, partRadius);
  }
}
