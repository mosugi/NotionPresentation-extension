import type { SlideControl } from "~contents/lib/SlideControl"

import { toggleFullScreen } from "./OnScreenControl"

export const addKeyDownListener = (slideControl: SlideControl) => {
  document.body.addEventListener("keydown", async (event) => {
    if (event.key === "ArrowRight") {
      slideControl.next()
    }

    if (event.key === "ArrowLeft") {
      slideControl.previous()
    }
    if (event.key === "f") {
      toggleFullScreen()
    }
    if (event.key === "Escape") {
      await slideControl.exit()
    }
  })
}
