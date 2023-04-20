import { Storage } from "@plasmohq/storage"

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
import {playPageVideos} from "~contents/lib/video";

export type SlideControl = {
  init: () => void
  next: () => void
  back: () => void
  auto: () => void
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
    auto: async () => {
      const storage = new Storage()
      const enableAutoSlideshow = await storage.get<boolean>(
        "enableAutoSlideshow"
      )
      if (!enableAutoSlideshow) return
      while (slideIterator.hasNext()) {
        if (slideBlockIterator.hasNext()) {
          applyAfterOption(slideBlockIterator.current().value)
          await applyOption(slideBlockIterator.next().value)
        } else {
          hideSlideBlocks(currentSlide)
          currentSlide = slideIterator.next().value
          slideBlockIterator = makeCustomIterator(
            currentSlide.filter(isActionBlock)
          )
          await new Promise((s) => setTimeout(s, 500))
          showSlideBlocks(currentSlide)
          await playPageVideos(currentSlide)
        }
      }
    },
    exit: () => {
      exitFullScreen()
      window.location.reload()
    }
  }
}
