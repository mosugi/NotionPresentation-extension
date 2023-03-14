import { setStyle } from "./Util";
import options from "./Options";

const slideIn =
  "<style>@keyframes transition { from { margin-left: 100%; width: 300%;}to {margin-left: 0%;width: 100%;}}</style>";
const fadeIn =
  "<style>@keyframes transition { from { opacity:0 }to {opacity:1;}}</style>";
const fadeOut =
  "<style>@keyframes fadeOut { from { opacity:1 }to {opacity:0;}}</style>";
const animation =
  "<style>.notion-selectable {animation-duration: 0.5s;animation-name: transition;}</style>";
export const styleFirstPage = () => {
  if (!options.useCoverAsFirstSlide) {
    setStyle(".pseudoSelection > div", "display", "none"); // Cover
    setStyle(".pseudoSelection:first-of-type + div > div", "display", "none"); // Title
  }

  const coverImage = document.querySelector(
    ".pseudoSelection > div > div > div"
  );
  if (coverImage) {
    setStyle(".pseudoSelection > div", "height", "80vh"); // Cover original 30vh
    setStyle(".pseudoSelection > div > div > div", "height", "80vh"); // Cover original 30vh
    setStyle(
      ".pseudoSelection > div > div > div > div > img",
      "height",
      "80vh"
    ); // Cover original 30vh
  } else {
    setStyle(
      ".pseudoSelection:first-of-type + div > div",
      "position",
      "absolute"
    ); // Title original ''
    setStyle(".pseudoSelection:first-of-type + div > div", "top", "50%"); // Title original ''
    setStyle(
      ".pseudoSelection:first-of-type + div > div",
      "transform",
      "translateY(-50%)"
    ); // Title original ''
  }
  setStyle(".pseudoSelection:first-of-type + div > div", "width", "100%"); // Title original 900px
  setStyle(".pseudoSelection:first-of-type + div > div", "textAlign", "center"); // Title original ''
};
export const hiddenControls = () => {
  setStyle(".notion-topbar", "display", "none");
  setStyle(".notion-page-controls", "display", "none");
};
export const addAnimation = () => {
  document.querySelector("head").insertAdjacentHTML("beforeend", fadeIn);
  document.querySelector("head").insertAdjacentHTML("beforeend", fadeOut);
  document.querySelector("head").insertAdjacentHTML("beforeend", animation);
};
