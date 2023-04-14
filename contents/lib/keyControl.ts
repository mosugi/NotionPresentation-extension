import type { SlideControl } from "~contents/lib/slideControl"

import { toggleFullScreen } from "./screenControl"

export const addKeyDownListener = (slideControl: SlideControl) => {
  document.body.addEventListener("keydown", async (event) => {
    if (event.key === "ArrowRight") {
      await slideControl.next()
    }

    if (event.key === "ArrowLeft") {
      slideControl.back()
    }
    if (event.key === "f") {
      toggleFullScreen()
    }
    if (event.key === "Escape") {
      await slideControl.exit()
    }
  })
}
