import type { SlideBlock } from "~contents/lib/block"
import { isSeparator } from "~contents/lib/block"
import type { Slide } from "~contents/lib/slide"
import { coverSelector, titleTagWrapperSelector } from "~contents/lib/style"
import type { BlockOption } from "~types/BlockOption"

export type Slideshow = Slide[]

const blockSelector = ".notion-page-content .notion-selectable"

const makeSlidesWithSeparator = (accumulator, currentValue) => {
  if (isSeparator(currentValue)) {
    accumulator.push([currentValue])
  } else {
    accumulator[accumulator.length - 1].push(currentValue)
  }
  return accumulator
}

export const createSlides = (
  useCoverAsFirstSlide: boolean = true,
  blockOptions: Map<string, BlockOption>
) => {
  const initSlideShow: Slideshow = []
  if (useCoverAsFirstSlide) {
    const slide: Slide = []
    const cover = document.querySelector(coverSelector)
    if (cover) {
      slide.push({ target: document.querySelector(coverSelector) })
    }
    slide.push({ target: document.querySelector(titleTagWrapperSelector) })

    initSlideShow.push(slide)
  }

  const notionPageBlocks = Array.from(document.querySelectorAll(blockSelector))

  const mapSlideBlock = (element): SlideBlock => ({
    target: element as HTMLElement,
    option: blockOptions.get(element.className)
  })

  return notionPageBlocks
    .map(mapSlideBlock)
    .reduce(makeSlidesWithSeparator, initSlideShow)
}
