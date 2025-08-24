import { handleResize } from "../../utils/utils";
import * as dat from "dat.gui";

export function run(canvas, context) {
  const gui = new dat.GUI();

  handleResize(canvas);

  const wave = {
    y: canvas.height / 2,
    largura: 0.01,
    amplitude: 100,
    frequencia: 0.01,
  };

  const strokeColor = {
    h: 200,
    s: 50,
    l: 50,
  };

  const backgroundColor = {
    r: 36,
    g: 36,
    b: 36,
    a: 0.01,
  };

  // Chame o remember ANTES de adicionar os controles.

  const waveFolder = gui.addFolder("Wave");
  const yController = waveFolder.add(wave, "y", 0, canvas.height);
  waveFolder.add(wave, "largura", -0.1, 0.1);
  waveFolder.add(wave, "amplitude", -300, 300);
  waveFolder.add(wave, "frequencia", 0.01, 1);
  waveFolder.open();

  const strokeFolder = gui.addFolder("Stroke");
  strokeFolder.add(strokeColor, "h", 0, 255);
  strokeFolder.add(strokeColor, "s", 0, 100);
  strokeFolder.add(strokeColor, "l", 0, 100);
  strokeFolder.open();

  const backgroundFolder = gui.addFolder("background");
  backgroundFolder.add(backgroundColor, "r", 0, 255);
  backgroundFolder.add(backgroundColor, "g", 0, 255);
  backgroundFolder.add(backgroundColor, "b", 0, 255);
  backgroundFolder.add(backgroundColor, "a", 0, 1);
  backgroundFolder.open();

  function init() {
    handleResize(canvas);
    yController.max(canvas.height);
  }

  let animationId;

  let incremento = wave.frequencia;
  function animate() {
    animationId = requestAnimationFrame(animate);
    context.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(0, wave.y);

    for (let i = 0; i < canvas.width; i++) {
      context.lineTo(
        i,
        wave.y +
          Math.sin(i * wave.largura + incremento) *
            wave.amplitude *
            Math.sin(incremento),
      );
    }

    context.strokeStyle = `hsl(${Math.abs(
      strokeColor.h * Math.sin(incremento),
    )}, ${strokeColor.s}%, ${strokeColor.l}%)`;
    context.stroke();

    incremento += wave.frequencia;
    // console.log(incremento);
  }

  function onResize() {
    init();
  }

  window.addEventListener("resize", onResize);

  init();
  animate();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", onResize);
    gui.destroy();
  };
}
