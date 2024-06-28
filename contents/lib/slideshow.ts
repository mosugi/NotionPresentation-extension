import type { SlideBlock } from "~contents/lib/block"
import { isSeparator } from "~contents/lib/block"
import type { Slide } from "~contents/lib/slide"
import {COVER_SELECTOR, TITLE_PROPERTY_SELECTOR} from "~contents/lib/style"
import { last, lastFlat } from "~contents/lib/util"
import type { BlockOption } from "~types/BlockOption"

export type Slideshow = Slide[]

const BLOCK_SELECTOR = ".notion-page-content .notion-selectable" as const

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
  blockOptions: Map<string, BlockOption>,
  initSlideShow: Slideshow = []
): Slideshow => {
  const mapSlideBlock = (element): SlideBlock => ({
    target: element as HTMLElement,
    option: blockOptions.get(element.className)
  })

  const notionPageBlocks = Array.from(document.querySelectorAll(BLOCK_SELECTOR))

  return notionPageBlocks
    .map(mapSlideBlock)
    .reduce(makeSlidesWithSeparator, initSlideShow)
}

export const getPageCoverSlide = () => {
    const slide: Slide = []
    const cover = document.querySelector(COVER_SELECTOR)
    if (cover) {
      slide.push({ target: cover as HTMLElement})
    }
    document.querySelectorAll(TITLE_PROPERTY_SELECTOR).forEach(element => {
      slide.push({ target: element as HTMLElement });
    });
    return slide
}
