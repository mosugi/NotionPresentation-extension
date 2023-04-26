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

import { exitFullScreen } from "./fullScreen"
import {blockToSpeech} from "~contents/lib/textToSpeech";

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
      const enableReadAloud = await storage.get<boolean>(
          "enableReadAloud"
      )
      if(enableReadAloud){
        await blockToSpeech(slideIterator.current().value[1]?.target.innerText)
      }
      while (slideIterator.hasNext() || slideBlockIterator.hasNext()) {
        if (slideBlockIterator.hasNext()) {
          await applyNextOption()
        } else if (slideIterator.hasNext()) {
          switchNextSlide()
        }
      }
    },
    exit: () => {
      exitFullScreen()
      window.location.reload()
    }
  }
}
