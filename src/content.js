import { addAnimation, hiddenControls, styleFirstPage } from "./lib/Style";
import { addKeyDownListener } from "./lib/KeyControl";
import { addOsc } from "./lib/OnScreenControl";
import slideShow from "./lib/Slideshow";

const initPresentation = async () => {
  styleFirstPage();
  hiddenControls();
  addOsc();
  addKeyDownListener();
  addAnimation();
  slideShow.init();
};

await initPresentation();
