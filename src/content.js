import { slides } from "./lib/Slides";
import { addAnimation, hiddenControls, styleFirstPage } from "./lib/Style";
import { hidePageBlocks, showPageBlocks } from "./lib/Blocks";
import { addKeyDownListener } from "./lib/KeyControl";
import { addOsc } from "./lib/OnScreenControl";

const initPresentation = (slides) => {
  styleFirstPage();
  hiddenControls();
  slides.forEach(hidePageBlocks);
  addOsc();
  addKeyDownListener();
  addAnimation();
};

initPresentation(slides.all());
showPageBlocks(slides.first());
