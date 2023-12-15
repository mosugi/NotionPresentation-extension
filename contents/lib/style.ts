import { setStyle } from "~contents/lib/util"

export const coverSelector =
  "div.layout-full"

export const titleAndTagSelectorAll =
  ".layout-content:not(.layout-editor)"

export const styleFirstPage = (useCoverAsFirstSlide: boolean = true) => {
  // FIXME 動かないのでコメントアウト
  // const coverImage = document.querySelector(coverInnerImageSelector)
  // setStyle(coverSelector, "height", "80vh") // original 30vh
  // // if (coverImage) {
  //   setStyle(coverSelector, "height", "80vh") // original 30vh
  //   setStyle(coverInnerSelector, "height", "80vh") // original 30vh
  //   setStyle(coverInnerImageSelector, "height", "80vh") // original 30vh
  //   setStyle(titleSelector, "textAlign", "center") // original ''
  //   setStyle(titleSelector, "width", "100%") // original 900px
  // } else {
  //   setStyle(titleSelector, "position", "absolute") // original ''
  //   setStyle(titleSelector, "top", "50%") // original ''
  // }
  // setStyle(tagSelector, "display", "none")
  // if (!useCoverAsFirstSlide) {
  //   setStyle(coverSelector, "display", "none")
  //   setStyle(titleTagWrapperSelector, "display", "none")
  // }
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
