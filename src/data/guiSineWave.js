export const defPresets = (wave, canvas, gui) => {
  let presets;
  return (presets = {
    retrowave: () => {
      wave.largura = 0.04;
      wave.amplitude = 150;
      wave.frequencia = 0.08;
      wave.clear = false;
      wave.BGcolor = "#12022F";
      wave.LineColor = "#F400F9";
      wave.opacity = 0.1;
    },
    lazer: () => {
      wave.largura = 0.02;
      wave.amplitude = 200;
      wave.frequencia = 0.05;
      wave.clear = false;
      wave.BGcolor = "#000000";
      wave.LineColor = "#ff0000ff";
      wave.opacity = 0.1;
    },
    reset: () => {
      wave.y = canvas.height / 2;
      wave.largura = 0.01;
      wave.amplitude = 100;
      wave.frequencia = 0.05;
      wave.clear = false;
      wave.BGcolor = "#f0f0f2";
      wave.LineColor = "#000000";
      wave.opacity = 1;
    },
  });
};
