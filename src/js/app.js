// libs
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// ui

import { debounce, setFullHeight } from "./helpers/myHelpers.js";

// Animations
import {
  initInlineTextEffects,
  initInlineUpTextEffects,
} from "./animations/textEffects.js";
import { initMaskEffect } from "./animations/maskEffect.js";
import { initMorfingFigures } from "./animations/morfingFigures.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  setFullHeight();

  initInlineTextEffects(".js-inline-text-effect");
  initInlineUpTextEffects(".js-inline-up-text-effect");
  initMorfingFigures(".js-figures-pin");
  initMaskEffect(".js-mask-effect");

  // body height observer

  const startBodyHeight = document.body.clientHeight;
  const resizeObserver = new ResizeObserver(
    debounce((entries) => {
      const bodyHeight = entries[0].target.clientHeight;

      if (startBodyHeight === bodyHeight) return;

      console.log("Body height changed:", bodyHeight);

      // update scrolltriggers positions
      ScrollTrigger.refresh();
    }, 300),
  );

  resizeObserver.observe(document.body);
});
