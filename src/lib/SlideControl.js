import { exitFullScreen } from "./FullScreen";
import slideShow from "./Slideshow";

export const nextSlide = () => {
  slideShow.nextSlide();
};
export const previousSlide = () => {
  slideShow.previousSlide();
};
export const exitSlide = () => {
  exitFullScreen();
  window.location.reload();
};
