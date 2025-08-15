import * as dat from "dat.gui";
import { handleResize } from "../../utils/utils.js";
import { runV1 } from "./circular-motion-v1.js";
import { runV2 } from "./circular-motion-v2.js";

export function run(canvas, context) {
  const gui = new dat.GUI();
  let cleanupCurrentMode;

  handleResize(canvas);

  const mode = {
    switch: true,
  };

  gui
    .add(mode, "switch")
    .name("Switch Mode")
    .onChange(() => {
      init();
    });

  function init() {
    if (cleanupCurrentMode) {
      cleanupCurrentMode();
    }
    if (mode.switch) {
      cleanupCurrentMode = runV1(canvas, context);
    } else {
      cleanupCurrentMode = runV2(canvas, context);
    }
  }
  init();

  return () => {
    if (cleanupCurrentMode) {
      cleanupCurrentMode();
    }
    gui.destroy();
  };
}
