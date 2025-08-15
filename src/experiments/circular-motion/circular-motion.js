import * as dat from "dat.gui";
import { handleResize } from "../../utils/utils.js";
import { runV1 } from "./circular-motion-v1.js";
import { runV2 } from "./circular-motion-v2.js";

export function run(canvas, context) {
  const gui = new dat.GUI();
  let cleanupCurrentMode = null; // Guarda a função de limpeza do modo atual

  handleResize(canvas);

  const options = {
    modeV1: true,
  };

  gui
    .add(options, "modeV1")
    .name("Switch Mode")
    .onChange(() => {
      // Limpa o modo anterior e inicia o novo
      if (cleanupCurrentMode) {
        cleanupCurrentMode();
      }
      init();
    });

  function init() {
    // Executa a função de limpeza do modo anterior, se existir
    if (cleanupCurrentMode) {
      cleanupCurrentMode();
    }

    // Inicia o modo selecionado e armazena sua função de limpeza
    if (options.modeV1) {
      cleanupCurrentMode = runV1(canvas, context);
    } else {
      cleanupCurrentMode = runV2(canvas, context);
    }
  }

  // Inicia a primeira vez
  init();

  // Retorna uma função de limpeza para este módulo principal
  return () => {
    if (cleanupCurrentMode) {
      cleanupCurrentMode();
    }
    gui.destroy();
  };
}
