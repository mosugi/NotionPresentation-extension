const slideIn =
  "<style>@keyframes transition { from { margin-left: 100%; width: 300%;}to {margin-left: 0%;width: 100%;}}</style>";
const fadeIn =
  "<style>@keyframes transition { from { opacity:0 }to {opacity:1;}}</style>";
const fadeOut =
  "<style>@keyframes fadeOut { from { opacity:1 }to {opacity:0;}}</style>";
const animation =
  "<style>.notion-selectable {animation-duration: 0.5s;animation-name: transition;}</style>";
export const styleFirstPage = () => {
  document.querySelector(".pseudoSelection > div").style.height = "80vh"; // original 30vh
  document.querySelector(".pseudoSelection > div > div > div").style.height =
    "80vh"; // original 30vh
  document.querySelector(
    ".pseudoSelection > div > div > div > div > img"
  ).style.height = "80vh"; // original 30vh
  document.querySelector(
    ".pseudoSelection:first-of-type + div > div"
  ).style.width = "100%"; // original 900px
  document.querySelector(
    ".pseudoSelection:first-of-type + div > div"
  ).style.textAlign = "center"; // original ''
};
export const hiddenControls = () => {
  document.querySelector(".notion-topbar").style.display = "none";
  document.querySelector(".notion-page-controls").style.display = "none";
};
export const addAnimation = () => {
  document.querySelector("head").insertAdjacentHTML("beforeend", fadeIn);
  document.querySelector("head").insertAdjacentHTML("beforeend", fadeOut);
  document.querySelector("head").insertAdjacentHTML("beforeend", animation);
};
