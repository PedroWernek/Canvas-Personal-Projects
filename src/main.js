import FloatingCircle from "../../aaaa/models/floatingCircle.js";

let canvas = document.querySelector("canvas");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

//c = context
let c = canvas.getContext("2d");

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

let maxRadius = 20;
let gravity = 3;
let dist = 40;

let colorArray = [
  "23, 32, 38",
  "95, 205, 217",
  "2, 115, 115",
  "4, 191, 173",
  "4, 191, 157",
];

class FloatingCircle {
  constructor(x, y, radius, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = maxRadius + this.radius;
    this.opacity = 0;
    this.baseColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  draw(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;
    c.fill();
  }

  update(mousex, mousey, width, height, c) {
    this.x += this.velX;
    this.y += this.velY;

    if (this.x + this.radius > width || this.x - this.radius < 0) {
      this.velX *= -1;
    }
    if (this.y + this.radius > height || this.y - this.radius < 0) {
      this.velY *= -1;
    }
    //interactivity
    if (
      mousex - this.x < 50 &&
      mousex - this.x > -50 &&
      mousey - this.y < 50 &&
      mousey - this.y > -50
    ) {
      if (this.radius < this.maxRadius) {
        this.radius += 1;
        if (this.opacity < 1) {
          this.opacity += 0.1;
        }
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
      if (this.opacity > 0) {
        this.opacity -= 0.1;
      }
    }
    this.draw(c);
  }
}

//drawing in the canvas

//Line
// c.beginPath(); //starting a path (começo de uma linha)
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(300, 400);
// c.strokeStyle = "blue"; //setting a color of the line after the drawing
// c.stroke(); //drawing de line after the path setting

// //Rectangle
// c.fillStyle = "rgb(0, 0 , 255, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgb(244, 22 , 0, 0.5)";
// c.fillRect(300, 300, 100, 100);
// c.fillRect(400, 400, 100, 100);

// //Arc / circle
// c.arc(100, 100, 30, 0, Math.PI * 2, false);
// c.fillStyle = "rgb(0, 255, 0, 0.5) ";
// c.fill();
// c.stroke();

// c.arc(100, 100, 30, 0, Math.PI * 2, false);
// c.fillStyle = "rgb(0, 255, 0, 0.5) ";
// c.fill();
// c.stroke();

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function (event) {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  init();
});

let cicleArray = [];

function init() {
  cicleArray = [];
  for (let i = 0; i < 800; i++) {
    let radius = Math.floor(Math.random() * 10 + 1);
    let x = Math.random() * (width - radius * 2) + radius;
    let y = Math.random() * (height - radius * 2) + radius;
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;

    cicleArray.push(new FloatingCircle(x, y, radius, dx, dy));
  }
}

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, width, height);

  for (let i = 0; i < cicleArray.length; i++) {
    cicleArray[i].update(mouse.x, mouse.y, width, height, c);
  }
}

init();
animate();
