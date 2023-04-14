import type { SlideBlock } from "~contents/lib/block"
import { isActionBlock } from "~contents/lib/block"
import { CustomIterator, makeCustomIterator } from "~contents/lib/iterator"
import {
  Slide,
  applyAfterOption,
  applyOption,
  hideSlideBlocks,
  showSlideBlocks
} from "~contents/lib/slide"
import type { Slideshow } from "~contents/lib/slideshow"

import { exitFullScreen } from "./fullScreen"

export type SlideControl = {
  init: () => void
  next: () => void
  back: () => void
  exit: () => void
}

export const createSlideControl = (slideshow: Slideshow): SlideControl => {
  const slideIterator = makeCustomIterator(slideshow)
  let slideBlockIterator: CustomIterator<SlideBlock>
  let currentSlide: Slide

  return {
    init: () => {
      slideshow.map(hideSlideBlocks)
      currentSlide = slideIterator.next().value
      slideBlockIterator = makeCustomIterator(
        currentSlide.filter(isActionBlock)
      )
      showSlideBlocks(currentSlide)
    },
    next: async () => {
      if (slideBlockIterator.hasNext()) {
        applyAfterOption(slideBlockIterator.current().value)
        await applyOption(slideBlockIterator.next().value)
      } else if (slideIterator.hasNext()) {
        hideSlideBlocks(currentSlide)
        currentSlide = slideIterator.next().value
        slideBlockIterator = makeCustomIterator(
          currentSlide.filter(isActionBlock)
        )
        showSlideBlocks(currentSlide)
      }
    },
    back: () => {
      hideSlideBlocks(currentSlide)
      currentSlide = slideIterator.back().value
      slideBlockIterator = makeCustomIterator(
        currentSlide.filter(isActionBlock)
      )
      showSlideBlocks(currentSlide)
    },
    exit: () => {
      exitFullScreen()
      window.location.reload()
    }
  }
}
