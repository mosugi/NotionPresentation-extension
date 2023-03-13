import { slides } from "./lib/Slides";
import { addAnimation, hiddenControls, styleFirstPage } from "./lib/Style";
import { hidePageBlocks, showPageBlocks } from "./lib/Blocks";
import { addKeyDownListener } from "./lib/KeyControl";
import { addOsc } from "./lib/OnScreenControl";
import { setProp } from "./lib/Properties";

const initPresentation = async (slides) => {
  await setProp();
  styleFirstPage();
  hiddenControls();
  slides.forEach(hidePageBlocks);
  addOsc();
  addKeyDownListener();
  addAnimation();
};

initPresentation(slides.all()).then(() => {
  console.log(slides.first());
  showPageBlocks(slides.first());
});
