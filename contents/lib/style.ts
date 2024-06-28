import {setElementStyle, setStyle, setStyleAll} from "~contents/lib/util"

export const COVER_SELECTOR = "div.layout-full" as const

export const TITLE_PROPERTY_SELECTOR =
  ".layout-content:not(:has(.notion-page-content))" as const

export const hideNotionControls = () => {
  setStyle(".notion-frame", "height", "100vh")
  setStyle(".notion-topbar", "display", "none")
  setStyle(".notion-page-controls", "display", "none")
  setStyle(".layout-margin-right", "display", "none")
}

export const hideNotionPageHeader = () => {
  setStyle(COVER_SELECTOR, "display", "none")
  setStyleAll(TITLE_PROPERTY_SELECTOR, "display", "none")
}

const adjustHeight = (element:HTMLElement) => {
  if (element.style.height) {
    element.style.height = '80vh';
  }
  Array.from(element.children).forEach(child => {
    adjustHeight(child as HTMLElement);
  });
}

export const styleNotionPageHeader = () => {
  debugger
  const pageCover = document.querySelector(COVER_SELECTOR);
  adjustHeight(pageCover as HTMLElement);
  document.querySelectorAll(TITLE_PROPERTY_SELECTOR).forEach((element,i) => {
    // タイトル以外の要素
    // display:noneはスライド切り替えで使われるためvisibility:hiddenを利用
    if(i > 0) setElementStyle(element, "visibility", "hidden")
  });
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
