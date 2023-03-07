import { slides } from "./lib/Slides";
import {
  addAnimation,
  hiddenControls,
  hidePageBlocks,
  showPageBlocks,
  styleFirstPage,
} from "./lib/Style";
import { addKeyDownListener, addOsc } from "./lib/Control";

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
