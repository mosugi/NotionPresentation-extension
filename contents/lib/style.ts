import { isNotionSite, setStyle } from "~contents/lib/util"

export const coverSelector = isNotionSite()
  ? "#notion-app > div > div:nth-child(1) > div > div:nth-child(1) > div.notion-frame > div > div.whenContentEditable > div.pseudoSelection > div"
  : "#notion-app > div > div:nth-child(1) > div > div:nth-child(2) > div.notion-frame > div > div.whenContentEditable > div.pseudoSelection > div"
const coverInnerSelector = `${coverSelector} > div:nth-child(1) > div`
const coverInnerImageSelector = `${coverInnerSelector} > div > img`

export const titleTagWrapperSelector = isNotionSite()
  ? "#notion-app > div > div:nth-child(1) > div > div:nth-child(1) > div.notion-frame > div > div.whenContentEditable > div:nth-child(3) > div"
  : "#notion-app > div > div:nth-child(1) > div > div:nth-child(2) > div.notion-frame > div > div.whenContentEditable > div:nth-child(3) > div"
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
  const keyFrames = `
    @keyframes slideIn {
      from {
        margin-left: 100%;
        width: 300%;
        }
      to {
        margin-left: 0%;
        width: 100%;
        }
    }
    @keyframes fadeIn {
        from {
            opacity:0
        }
        to {
            opacity:1;
        }
    }
`

  const notionSelectableStyle =
    "<style>.notion-selectable {animation-duration: 0.5s;animation-name: fadeIn;}</style>"
  document.querySelector("head").insertAdjacentHTML("beforeend", keyFrames)
  document
    .querySelector("head")
    .insertAdjacentHTML("beforeend", notionSelectableStyle)
}
