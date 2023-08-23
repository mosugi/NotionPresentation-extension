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
import { sleep } from "~contents/lib/util"
import { resetToActualSize } from "~contents/lib/zoom"

import { exitFullScreen } from "./fullScreen"

export type SlideControl = {
  init: () => void
  next: () => void
  back: () => void
  auto: () => void
  reRender: () => void
  exit: () => void
}

export const createSlideControl = (slideshow: Slideshow): SlideControl => {
  const slideIterator = makeCustomIterator(slideshow)
  let slideBlockIterator: CustomIterator<SlideBlock>
  let currentSlide: Slide

  const applyNextOption = async () => {
    applyAfterOption(slideBlockIterator.current().value)
    await applyOption(slideBlockIterator.next().value)
  }

  const switchNextSlide = () => {
    hideSlideBlocks(currentSlide)
    currentSlide = slideIterator.next().value
    slideBlockIterator = makeCustomIterator(currentSlide.filter(isActionBlock))
    showSlideBlocks(currentSlide)
  }

  const preload = async () => {
    slideshow.slice(-1)[0].slice(-1)[0].target.scrollIntoView({behavior: "smooth"})
    await sleep(50 * slideshow.length)
  }

  return {
    init: async  () => {
      await preload();
      slideshow.map(hideSlideBlocks)
      currentSlide = slideIterator.next().value
      slideBlockIterator = makeCustomIterator(
        currentSlide.filter(isActionBlock)
      )
      showSlideBlocks(currentSlide)
    },
    next: async () => {
      if (slideBlockIterator.hasNext()) {
        await applyNextOption()
      } else if (slideIterator.hasNext()) {
        switchNextSlide()
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
    reRender: async () => {
      slideshow.map(showSlideBlocks)
      await sleep(1000)
      slideshow.map(hideSlideBlocks)
      showSlideBlocks(currentSlide)
    },
    auto: async () => {
      const storage = new Storage()
      const enableAutoSlideshow = await storage.get<boolean>(
        "enableAutoSlideshow"
      )
      if (!enableAutoSlideshow) return
      await sleep(3000)
      while (slideIterator.hasNext() || slideBlockIterator.hasNext()) {
        if (slideBlockIterator.hasNext()) {
          await applyNextOption()
        } else if (slideIterator.hasNext()) {
          switchNextSlide()
        }
      }
    },
    exit: async () => {
      await resetToActualSize()
      exitFullScreen()
      window.location.reload()
    }
  }
}
