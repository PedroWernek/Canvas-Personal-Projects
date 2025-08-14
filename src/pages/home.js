import { handleResize, randomIntFromRange, distance } from "../utils/utils.js";
import { experimentsArray } from "../data/experimentsLocations.js";

export function renderHomePage(app) {
  app.innerHTML = `
    <div class="home-container">
    <canvas></canvas>
    <div class="overlay">
    <h1>Selecione um Projeto</h1>
    <div class="grid-container">
    ${Object.keys(experimentsArray)
      .map(
        (key) => `
        <a href="${key}" class="project-card">
        <h2>${experimentsArray[key].title}</h2>
        <p>${experimentsArray[key].description}</p>
        </a>
        `,
      )
      .join("")}
      </div>
      </div>
    </div>
  `;
  document.title = "Home | Canvas Projects";

  const canvas = app.querySelector("canvas");
  const context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  class Circle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = randomIntFromRange(-1, 1);
      this.dy = randomIntFromRange(-1, 1);
      this.maxRadius = radius;
      this.radius = 0;
      this.color = color;
    }

    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    }
    update() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      if (
        distance(mouse.x, mouse.y, this.x, this.y) < 50 &&
        this.radius < this.maxRadius
      ) {
        this.radius += 1;
      } else if (this.radius > 0) {
        this.radius -= 1;

        this.radius = Math.max(0, this.radius);
      }

      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    }
  }

  let circleArray;
  function init() {
    circleArray = [];

    for (let i = 0; i < 400; i++) {
      let radius = randomIntFromRange(10, 50);
      let x = Math.random() * (innerWidth - radius * 2) + radius;
      let y = Math.random() * (innerHeight - radius * 2) + radius;
      let color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256,
      )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
      circleArray.push(new Circle(x, y, radius, color));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    circleArray.forEach((circle) => {
      circle.update();
    });
  }

  window.addEventListener("resize", () => {
    handleResize(canvas);
    init();
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  init();
  animate();
}
