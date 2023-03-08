import { toggleFullScreen } from "./OnScreenControl";
import { exitSlide, nextSlide, previousSlide } from "./SlideControl";

export const addKeyDownListener = () => {
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
};