import { handleResize } from "../../utils/utils";
import { defPresets } from "../../data/guiSineWave";
import * as dat from "dat.gui";

export function run(canvas, context) {
  const gui = new dat.GUI();

  handleResize(canvas);

  const wave = {
    y: canvas.height / 2,
    largura: 0.01,
    amplitude: 100,
    frequencia: 0.05,
    clear: false,
    BGcolor: "#f0f0f2",
    LineColor: "#000000",
    opacity: 1,
  };

  // Objeto para os presets
  const presets = defPresets(wave, canvas, gui);

  // Chame o remember ANTES de adicionar os controles.

  const waveFolder = gui.addFolder("Wave Properties");
  const yController = waveFolder.add(wave, "y", 0, canvas.height);
  waveFolder.add(wave, "largura", -0.1, 0.1);
  waveFolder.add(wave, "amplitude", -300, 300);
  waveFolder.add(wave, "frequencia", 0.01, 1);
  waveFolder.add(wave, "clear");
  waveFolder.add(wave, "opacity", 0, 1);

  const hueFolder = gui.addFolder("Colors");
  hueFolder.addColor(wave, "BGcolor").name("Background Color");
  hueFolder.addColor(wave, "LineColor").name("Line Color");

  // Adicionando a pasta de presets
  const presetFolder = gui.addFolder("Presets");
  for (const preset in presets) {
    presetFolder.add(presets, preset);
  }

  function init() {
    handleResize(canvas);
    yController.max(canvas.height);
  }

  let animationId;
  let incremento = wave.frequencia;

  function animate() {
    animationId = requestAnimationFrame(animate);
    context.strokeStyle = wave.LineColor;
    if (wave.clear) {
      context.fillStyle = wave.BGcolor;
      context.globalAlpha = wave.opacity;
      context.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      context.fillStyle = wave.BGcolor;
      context.globalAlpha = 0.1;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = 1;
    }

    context.beginPath();
    context.moveTo(0, wave.y);

    for (let i = 0; i < canvas.width; i++) {
      context.lineTo(
        i,
        wave.y + Math.sin(i * wave.largura + incremento) * wave.amplitude,
      );
    }
    context.stroke();

    incremento += wave.frequencia;
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
