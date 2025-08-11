import utils from "../utils";
import setupCanvas from "../../common/canvas-setup.js";

const { canvas, c } = setupCanvas();

const GRAVITY = 1;
const FRICTION = 0.9;
const BALL_COUNT = 100;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("click", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  init();
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init(mouse.x, mouse.y);
});

class Ball {
  constructor(x, y, radius, velX, velY, color) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = 2;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if (this.y + this.radius + this.velY > canvas.height) {
      this.velY = -this.velY * FRICTION;
      this.velX *= FRICTION;
    } else {
      this.velY += GRAVITY;
    }
    if (
      this.x + this.radius + this.velX > canvas.width ||
      this.x - this.radius + this.velX < 0
    ) {
      this.velX = -this.velX * FRICTION;
    }

    this.x += this.velX;
    this.y += this.velY;
    this.draw();
  }
}

// Implementation
let ballArray = [];
function init(mouseX, mouseY) {
  ballArray = [];
  for (let i = 0; i < BALL_COUNT; i++) {
    let radius = Math.random() * 20 + 10;
    let x = utils.randomIntFromRange(radius, canvas.width - radius);
    let y = utils.randomIntFromRange(0, canvas.height - radius);
    let velX = utils.randomIntFromRange(-10, 10);
    let velY = utils.randomIntFromRange(-10, 10);
    let color = utils.randomColor(colors);
    ballArray.push(new Ball(x, y, radius, velX, velY, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

init();
animate();
