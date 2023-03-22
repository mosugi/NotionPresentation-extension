import type { SlideControl } from "~contents/lib/SlideControl"

import { toggleFullScreen } from "./OnScreenControl"

export const addKeyDownListener = (
  slideControl: SlideControl,
  enableKeyboard: boolean
) => {
  if (true) {
    document.body.addEventListener("keydown", async (event) => {
      if (
        event.key === "ArrowRight" ||
        event.key === "s" ||
        event.key === "d"
      ) {
        slideControl.next()
      }

      if (event.key === "ArrowLeft" || event.key === "w" || event.key === "a") {
        slideControl.previous()
      }
      if (event.key === "f") {
        toggleFullScreen()
      }
      if (event.key === "Escape" || event.key === "e") {
        slideControl.exit()
      }
      if (event.key === "p") {
        console.log("Auto presentation start.")
        await slideControl.auto()
        console.log("Auto presentation end.")
      }
    })
  }
}
