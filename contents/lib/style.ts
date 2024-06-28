import {setStyle, setStyleAll} from "~contents/lib/util"

export const COVER_SELECTOR = "div.layout-full" as const

export const TITLE_PROPERTY_SELECTOR =
  ".layout-content:not(:has(.notion-page-content))" as const

export const hideNotionControls = () => {
  setStyle(".notion-frame", "height", "100vh")
  setStyle(".notion-topbar", "display", "none")
  setStyle(".notion-page-controls", "display", "none")
}

export const hideNotionPageHandler = () => {
  setStyle(COVER_SELECTOR, "display", "none")
  setStyleAll(TITLE_PROPERTY_SELECTOR, "display", "none")
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
