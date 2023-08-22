import type { SlideControl } from "~contents/lib/slideControl"
import { isNotionSite } from "~contents/lib/util"

import { toggleFullScreen } from "./screenControl"

export const addKeyDownListener = (slideControl: SlideControl) => {
  const handleKeyDown = async (event: KeyboardEvent) => {
    const useAltModifier = !isNotionSite() && event.altKey

    if (useAltModifier || isNotionSite()) {
      // 操作が必要なキーイベントの場合、activeElementをblurする
      ;(document.activeElement as HTMLElement).blur()

      switch (event.key) {
        case "ArrowRight":
          await slideControl.next()
          break
        case "ArrowLeft":
          slideControl.back()
          break
        case "f":
          toggleFullScreen()
          break
        case "a":
          await slideControl.auto()
          break
      }
    }

    if (event.key === "Escape") {
      await slideControl.exit()
    }
  }

  document.body.addEventListener("keydown", handleKeyDown)
}
