import { setStyle } from "~contents/lib/util"

export const coverSelector =
  "div.whenContentEditable > div.pseudoSelection > div"
const coverInnerSelector = `${coverSelector} > div:nth-child(1) > div`
const coverInnerImageSelector = `${coverInnerSelector} > div > img`

export const titleTagWrapperSelector =
  "div.whenContentEditable > div:nth-child(3) > div"
const titleSelector = `${titleTagWrapperSelector} > div:nth-child(1)`
const tagSelector = `${titleTagWrapperSelector} > div:nth-child(2)`

export const styleFirstPage = (useCoverAsFirstSlide: boolean = true) => {
  const coverImage = document.querySelector(coverInnerImageSelector)

  if (coverImage) {
    setStyle(coverSelector, "height", "80vh") // original 30vh
    setStyle(coverInnerSelector, "height", "80vh") // original 30vh
    setStyle(coverInnerImageSelector, "height", "80vh") // original 30vh
    setStyle(titleSelector, "textAlign", "center") // original ''
    setStyle(titleSelector, "width", "100%") // original 900px
  } else {
    setStyle(titleSelector, "position", "absolute") // original ''
    setStyle(titleSelector, "top", "50%") // original ''
  }
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
  // FIXME 個別のブロックのデフォルト値にした方がいいかも
  const notionSelectable = document.createElement("style")
  notionSelectable.innerHTML = `
    .notion-selectable {
      animation-duration: 0.5s;
      animation-name: fadeIn;
    }
`
  document.head.appendChild(notionSelectable)
}
