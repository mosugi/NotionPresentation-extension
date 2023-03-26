import type { BlockType } from "notion-types"

import { coverSelector, titleTagWrapperSelector } from "~contents/lib/Style"
import { isNotIncludes } from "~contents/lib/Util"
import type { BlockOption, BlockOptions } from "~types/BlockOption"

import { Slide } from "./Slide"

type Options = {
  separatorBlocks: BlockType[]
  useCoverAsFirstSlide: boolean
  blockOptions: { key: string; value: BlockOption }[]
}

export class Slideshow {
  private blockSelector = ".notion-page-content > .notion-selectable"
  ".pseudoSelection:first-of-type + div > div > div"

  private currentSlideIndex: number
  private readonly slides: Slide[]
  private useCoverAsFirstSlide: boolean
  private blockOptions: { value: BlockOption; key: string }[]
  private separatorBlocks: BlockType[]

  constructor(
    useCoverAsFirstSlide: boolean,
    blockOptions: { value: BlockOption; key: string }[]
  ) {
    this.currentSlideIndex = 0
    this.useCoverAsFirstSlide = useCoverAsFirstSlide
    this.blockOptions = blockOptions
    this.separatorBlocks = blockOptions
      .filter((it) => it.value.useAsSeparator)
      .map((it) => `notion-${it.key}-block`)
    this.slides = this.createSlides()
  }

  createSlides() {
    let slide = new Slide(this.blockOptions)
    let internalSlides = []

    if (this.useCoverAsFirstSlide) {
      slide.add(document.querySelector(coverSelector))
      slide.add(document.querySelector(titleTagWrapperSelector))
      internalSlides.push(slide)
      slide = new Slide(this.blockOptions)
    }

    const notionPageBlocks = Array.from(
      document.querySelectorAll(this.blockSelector)
    )

    notionPageBlocks.forEach((it, i, arr) => {
      if (isNotIncludes(it.className, this.separatorBlocks)) {
        slide.add(it)
      } else {
        internalSlides.push(slide)
        slide = new Slide(this.blockOptions)
        slide.add(it)
      }

      if (i === arr.length - 1) {
        internalSlides.push(slide)
      }
    })
    return internalSlides
  }

  start() {
    this.all().forEach((it) => it.hidePageBlocks())
    this.first().showPageBlocks()
  }

  all() {
    return this.slides
  }
  first() {
    return this.slides[0]
  }
  last() {
    return this.slides[this.slides.length - 1]
  }
  current() {
    return this.slides[this.currentSlideIndex]
  }
  next() {
    this.currentSlideIndex = this.hasNext()
      ? this.currentSlideIndex + 1
      : this.currentSlideIndex
    return this.current()
  }
  hasNext() {
    return this.currentSlideIndex < this.slides.length - 1
  }
  previous() {
    this.currentSlideIndex =
      this.currentSlideIndex > 0
        ? this.currentSlideIndex - 1
        : this.currentSlideIndex
    return this.current()
  }
  nextSlide() {
    console.log(this.current())
    if (this.current().hasNextActionBlock()) {
      this.current().doAction()
    } else {
      this.current().hidePageBlocks()
      this.next().showPageBlocks()
    }
  }
  previousSlide() {
    this.current().hidePageBlocks()
    this.previous().showPageBlocks()
  }
}
