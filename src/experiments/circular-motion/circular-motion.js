import * as dat from "dat.gui";
import { handleResize } from "../../utils/utils.js";
import { runV1 } from "./circular-motion-v1.js";
import { runV2 } from "./circular-motion-v2.js";

export function run(canvas, context) {
  const gui = new dat.GUI();

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
    if (mode.switch) {
      runV1(canvas, context);
    } else {
      runV2(canvas, context);
    }
  }
  init();
}
