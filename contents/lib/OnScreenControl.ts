import type { SlideControl } from "~contents/lib/SlideControl"

import { exitFullScreen, requestFullScreen } from "./FullScreen"

export const toggleFullScreen = () => {
  const osc: HTMLElement = document.querySelector(
    "#notion-presentation-osc-switchFull"
  )
  if (document.fullscreenElement) {
    exitFullScreen()
    osc.innerText = "□"
  } else {
    requestFullScreen()
    osc.innerText = "◻︎"
  }
}

export const addOnScreenControl = (slideControl: SlideControl) => {
  document
    .querySelector("head")
    .insertAdjacentHTML(
      "beforeend",
      "<style>.notion-presentation-osc {animation-duration: 3s;animation-name: fadeOut;}</style>"
    )

  const oscStyle =
    "user-select: none; transition: opacity 700ms ease 0s, color 700ms ease 0s, transform 200ms ease 0s; cursor: pointer; opacity: 1; position: absolute; display: flex; align-items: center; justify-content: center; background: white; width: 36px; height: 36px; border-radius: 100%; font-size: 20px; box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px; z-index: 200;"
  document
    .querySelector(".notion-frame")
    .insertAdjacentHTML(
      "afterend",
      `<div id="notion-presentation-osc-previous" class="notion-presentation-osc" style="${oscStyle}; bottom: 16px; left: 50%;transform:translateX(-200%)">←</div>`
    )
  document
    .querySelector(".notion-frame")
    .insertAdjacentHTML(
      "afterend",
      `<div id="notion-presentation-osc-switchFull" class="notion-presentation-osc" style="${oscStyle}; bottom: 16px; left: 50%;transform:translateX(-50%)">□</div>`
    )
  document
    .querySelector(".notion-frame")
    .insertAdjacentHTML(
      "afterend",
      `<div id="notion-presentation-osc-next" class="notion-presentation-osc" style="${oscStyle}; bottom: 16px; left: 50%;transform:translateX(100%)">→</div>`
    )
  document
    .querySelector(".notion-frame")
    .insertAdjacentHTML(
      "afterend",
      `<div id="notion-presentation-osc-exit" class="notion-presentation-osc" style="${oscStyle}; top: 16px; right: 16px">×</div>`
    )

  document
    .querySelector("#notion-presentation-osc-previous")
    .addEventListener("click", () => slideControl.previous())
  document
    .querySelector("#notion-presentation-osc-switchFull")
    .addEventListener("click", () => toggleFullScreen())
  document
    .querySelector("#notion-presentation-osc-next")
    .addEventListener("click", () => slideControl.next())
  document
    .querySelector("#notion-presentation-osc-exit")
    .addEventListener("click", async () => await slideControl.exit())

  let timeoutId = null
  let timeoutLastUpdateTime = 0

  document.body.addEventListener("mousemove", (it) => {
    document
      .querySelectorAll(".notion-presentation-osc")
      .forEach((it) => ((it as HTMLElement).style.opacity = "1"))

    const diffMillis = Date.now() - timeoutLastUpdateTime

    if (diffMillis >= 3000) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        document
          .querySelectorAll(".notion-presentation-osc")
          .forEach((it) => ((it as HTMLElement).style.opacity = "0"))
      }, 3000)
      timeoutLastUpdateTime = Date.now()
    }
  })
}
