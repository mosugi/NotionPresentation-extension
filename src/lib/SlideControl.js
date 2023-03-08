import { slides } from "./Slides";
import { exitFullScreen } from "./FullScreen";
import { hidePageBlocks, showPageBlocks } from "./Blocks";

export const nextSlide = () => {
  hidePageBlocks(slides.current());
  showPageBlocks(slides.next());
};
export const previousSlide = () => {
  hidePageBlocks(slides.current());
  showPageBlocks(slides.previous());
};
export const exitSlide = () => {
  exitFullScreen();
  window.location.reload();
};
