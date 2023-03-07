import {slides} from "./Slides";
import {toggleFullScreen} from "./FullScreen";
import {addAnimation, hiddenControls, hidePageBlocks, showPageBlocks, styleFirstPage} from "./Style";
import {addOsc, exitSlide, nextSlide, previousSlide} from "./Control";

const initSlide = (slides) => {
  styleFirstPage();
  hiddenControls();
  slides.forEach(hidePageBlocks);
  addOsc();
  addAnimation();
};

document.body.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "s" || event.key === "d") {
    nextSlide();
  }

  if (event.key === "ArrowLeft" || event.key === "w" || event.key === "a") {
    previousSlide();
  }
  if (event.key === "f") {
    toggleFullScreen();
  }
  if (event.key === "Escape" || event.key === "e") {
    exitSlide();
  }
});

initSlide(slides.all());
showPageBlocks(slides.first());