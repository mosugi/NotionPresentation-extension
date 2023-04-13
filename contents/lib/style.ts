import { setStyle } from "~contents/lib/util"

export const coverSelector =
  "#notion-app > div > div:nth-child(1) > div > div:nth-child(1) > div.notion-frame > div > div.whenContentEditable > div.pseudoSelection > div"
const coverInnerSelector = `${coverSelector} > div:nth-child(1) > div`
const coverInnerImageSelector = `${coverInnerSelector} > div > img`

export const titleTagWrapperSelector =
  "#notion-app > div > div:nth-child(1) > div > div:nth-child(1) > div.notion-frame > div > div.whenContentEditable > div:nth-child(3) > div"
const titleSelector = `${titleTagWrapperSelector} > div:nth-child(1)`
const tagSelector = `${titleTagWrapperSelector} > div:nth-child(2)`

// title & tag
// #notion-app > div > div:nth-child(1) > div > div:nth-child(1) > div.notion-frame > div > div.whenContentEditable > div:nth-child(3) > div

export const styleFirstPage = (useCoverAsFirstSlide: boolean = true) => {
  const coverImage = document.querySelector(coverInnerImageSelector)

  if (coverImage) {
    setStyle(coverSelector, "height", "80vh") // original 30vh
    setStyle(coverInnerSelector, "height", "80vh") // original 30vh
    setStyle(coverInnerImageSelector, "height", "80vh") // original 30vh
  } else {
    setStyle(titleSelector, "position", "absolute") // original ''
    setStyle(titleSelector, "top", "50%") // original ''
    setStyle(titleSelector, "transform", "translateY(-50%)") // original ''
  }
  setStyle(titleSelector, "width", "100%") // original 900px
  setStyle(titleSelector, "textAlign", "center") // original ''
  setStyle(tagSelector, "display", "none")
  if (!useCoverAsFirstSlide) {
    setStyle(coverSelector, "display", "none")
    setStyle(titleTagWrapperSelector, "display", "none")
  }
}
export const hideControls = () => {
  setStyle(".notion-frame", "height", "100vh")
  setStyle(".notion-topbar", "display", "none")
  setStyle(".notion-page-controls", "display", "none")
}
export const insertAnimationStyles = () => {
  const slideInKeyFrames =
    "<style>@keyframes slide-in { from { margin-left: 100%; width: 300%;}to {margin-left: 0%;width: 100%;}}</style>"
  const fadeInKeyFrames =
    "<style>@keyframes fade-in { from { opacity:0 }to {opacity:1;}}</style>"
  const notionSelectableStyle =
    "<style>.notion-selectable {animation-duration: 0.5s;animation-name: fade-in;}</style>"
  document
    .querySelector("head")
    .insertAdjacentHTML("beforeend", slideInKeyFrames)
  document
    .querySelector("head")
    .insertAdjacentHTML("beforeend", fadeInKeyFrames)
  document
    .querySelector("head")
    .insertAdjacentHTML("beforeend", notionSelectableStyle)
}
