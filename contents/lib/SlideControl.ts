import type { Slideshow } from "~contents/lib/Slideshow"

import { exitFullScreen } from "./FullScreen"

export class SlideControl {
  private slideshow: Slideshow
  constructor(slideShow: Slideshow) {
    this.slideshow = slideShow
  }
  next() {
    this.slideshow.nextSlide()
  }
  previous() {
    this.slideshow.previousSlide()
  }
  exit() {
    exitFullScreen()
    window.location.reload()
  }
}
