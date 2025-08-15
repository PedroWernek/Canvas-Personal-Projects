import { handleResize } from "../../utils/utils";
import * as dat from "dat.gui";

export function run(canvas, context) {
  const gui = new dat.GUI();

  handleResize(canvas); // garante altura correta antes de criar slider

  const wave = {
    y: canvas.height / 2,
    largura: 0.01,
    ampliture: 100,
    frequencia: 0.05,
    clear: true,
    BGcolor: "#f0f0f2",
  };

  const yController = gui.add(wave, "y", 0, canvas.height);
  gui.add(wave, "largura", -0.1, 0.1);
  gui.add(wave, "ampliture", -300, 300);
  gui.add(wave, "frequencia", 0.01, 1);
  gui.add(wave, "clear");
  gui
    .addColor(wave, "BGcolor")
    .onChange((value) => {
      wave.BGcolor = value;
    })
    .name("Background Color");

  function init() {
    handleResize(canvas);
    yController.max(canvas.height); // atualiza limite
  }

  let animationId;
  let incremento = wave.frequencia;

  function animate() {
    animationId = requestAnimationFrame(animate);

    if (wave.clear) {
      context.fillStyle = wave.BGcolor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    context.beginPath();
    context.moveTo(0, wave.y);

    for (let i = 0; i < canvas.width; i++) {
      context.lineTo(
        i,
        wave.y + Math.sin(i * wave.largura + incremento) * wave.ampliture,
      );
    }
    context.stroke();

    incremento += wave.frequencia;
  }

  function onResize() {
    init();
  }

  window.addEventListener("resize", onResize);

  animate();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", onResize);
    gui.destroy();
  };
}
