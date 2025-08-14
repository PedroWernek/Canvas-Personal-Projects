import {
  randomIntFromRange,
  randomColor,
  distance,
  handleResize,
  handleMouseMove,
} from "../../utils/utils.js";
import Particle from "./Particle.js";

export function run(canvas, context) {
  let colors = ["#2185C5", "#7ECEFD", "#ffbb3eff", "#FF7F66"];

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  // Event Listeners
  addEventListener("mousemove", (e) => handleMouseMove(e, canvas));

  addEventListener("resize", () => {
    handleResize(canvas);

    init();
  });

  // Objects

  // Implementation
  let particles;
  function init() {
    try {
      particles = [];

      for (let i = 0; i < 100; i++) {
        let radius = 10;
        let x = randomIntFromRange(radius, innerWidth - radius);
        let y = randomIntFromRange(radius, innerHeight - radius);

        let color = randomColor(colors);

        if (i !== 0) {
          //verify that the particles do not overlaping
          for (let j = 0; j < particles.length; j++) {
            if (
              distance(x, y, particles[j].x, particles[j].y) - radius * 2 <
              0
            ) {
              x = randomIntFromRange(radius, innerWidth - radius);
              y = randomIntFromRange(radius, innerHeight - radius);

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
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update(context, particles, mouse);
    });
  }

  init();
  animate();

  return () => {
    cancelAnimationFrame(animate);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("resize", handleResize);
  };
}
