import type { SlideControl } from "~contents/lib/slideControl"

export const addResizeListener = (slideControl: SlideControl) => {
  window.addEventListener(
    "resize",
    async () => {
      await slideControl.reRender()
    },
    false
  )
}
