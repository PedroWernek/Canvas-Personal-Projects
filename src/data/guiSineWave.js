import * as dat from "dat.gui";

export function guiSineWave(canvas) {
  const gui = new dat.GUI();

  const test2 = {
    y: canvas.height / 2,
    largura: 0.01,
    ampliture: 100,
    frequencia: 0.05,
    clear: false,
    BGcolor: "#f0f0f2",
    LineColor: "#000000",
    opacity: 1,
  };

  gui.add(test2, "largura", -0.1, 0.1);
  gui.add(test2, "ampliture", -300, 300);
  gui.add(test2, "frequencia", 0.01, 1);
  gui.add(test2, "clear");
  gui.add(test2, "opacity", 0, 1);
  gui
    .addColor(test2, "BGcolor")
    .onChange((value) => {
      test2.BGcolor = value;
    })
    .name("Background Color");
  gui
    .addColor(test2, "LineColor")
    .onChange((value) => {
      test2.LineColor = value;
      context.strokeStyle = hex2rgb(value);
    })
    .name("Line Color");

  return {
    test2,
  };
}
