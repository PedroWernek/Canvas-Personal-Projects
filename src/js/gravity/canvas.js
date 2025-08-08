import utils, { randomColor, randomIntFromRange } from "../utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

var gravity = 1;
var friction = 0.9;

canvas.width = innerWidth;
canvas.height = innerHeight;

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
      this.velY = -this.velY * friction;
      this.velX *= friction;
    } else {
      this.velY += gravity;
    }
    if (
      this.x + this.radius + this.velX > canvas.width ||
      this.x - this.radius + this.velX < 0
    ) {
      this.velX = -this.velX * friction;
    }

    this.x += this.velX;
    this.y += this.velY;
    this.draw();
  }
}

// Implementation
var ballArray = [];
function init(mouseX, mouseY) {
  ballArray = [];
  for (let i = 0; i < 100; i++) {
    var radius = Math.random() * 20 + 10;
    var x = randomIntFromRange(radius, canvas.width - radius);
    var y = randomIntFromRange(0, canvas.height - radius);
    var velX = randomIntFromRange(-10, 10);
    var velY = randomIntFromRange(-10, 10);
    var color = randomColor(colors);
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
