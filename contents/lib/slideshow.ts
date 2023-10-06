import type { SlideBlock } from "~contents/lib/block"
import { isSeparator } from "~contents/lib/block"
import type { Slide } from "~contents/lib/slide"
import { coverSelector, titleTagWrapperSelector } from "~contents/lib/style"
import { last, lastFlat } from "~contents/lib/util"
import type { BlockOption } from "~types/BlockOption"

export type Slideshow = Slide[]

const blockSelector = ".notion-page-content .notion-selectable"

const makeSlidesWithSeparator = (
  accumulator: Slideshow,
  currentValue: SlideBlock,
  currentIndex: number
) => {
  // 最初のslideを作成する
  if (currentIndex === 0) {
    accumulator.push([currentValue])
    // 最後のslideにseparatorがある場合は、新しいslideを作成しない
  } else if (isSeparator(currentValue) && !isSeparator(lastFlat(accumulator))) {
    accumulator.push([currentValue])
  } else {
    last(accumulator).push(currentValue)
  }
  return accumulator
}

export const createSlides = (
  useCoverAsFirstSlide: boolean = true,
  blockOptions: Map<string, BlockOption>
) => {
  const mapSlideBlock = (element): SlideBlock => ({
    target: element as HTMLElement,
    option: blockOptions.get(element.className)
  })

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

  return notionPageBlocks
    .map(mapSlideBlock)
    .reduce(makeSlidesWithSeparator, initSlideShow)
}
