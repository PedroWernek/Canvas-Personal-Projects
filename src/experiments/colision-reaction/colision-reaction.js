import utils from "../utils";
import Particle from "./particle";

import setupCanvas from "../../common/canvas-setup.js";

const { canvas, c } = setupCanvas();

let colors = ["#2185C5", "#7ECEFD", "#ffbb3eff", "#FF7F66"];

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects

// Implementation
let particles;
function init() {
  try {
    particles = [];

    for (let i = 0; i < 400; i++) {
      let radius = 10;
      let x = utils.randomIntFromRange(radius, innerWidth - radius);
      let y = utils.randomIntFromRange(radius, innerHeight - radius);

      let color = utils.randomColor(colors);

      if (i !== 0) {
        //verify that the particles do not overlaping
        for (let j = 0; j < particles.length; j++) {
          if (
            utils.distance(x, y, particles[j].x, particles[j].y) - radius * 2 <
            0
          ) {
            x = utils.randomIntFromRange(radius, innerWidth - radius);
            y = utils.randomIntFromRange(radius, innerHeight - radius);

            j = -1;
          }
        }
      }
      particles.push(new Particle(x, y, radius, color));
    }
  } catch (error) {
    console.error("Error initializing particles:", error);
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update(c, particles, mouse);
  });
}

init();
animate();
