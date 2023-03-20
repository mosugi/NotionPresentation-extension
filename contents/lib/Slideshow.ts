import type { BlockType } from "notion-types"

import { isNotIncludes } from "~contents/lib/Util"
import type { Props } from "~popup/BlockOptionItem"
import type { ActionBlock } from "~types/ActionBlock"
import type { BlockOption, BlockOptions } from "~types/BlockOption"

import { Slide } from "./Slide"

type Options = {
  separatorBlocks: BlockType[]
  useCoverAsFirstSlide: boolean
  blockOptions: { key: string; value: BlockOption }[]
}

export class Slideshow {
  private blockSelector = ".notion-page-content > .notion-selectable"
  private pageTitleAndPropSelector =
    ".pseudoSelection:first-of-type + div > div > div"
  private pageCoverSelector = ".pseudoSelection:first-of-type"

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
    if (this.useCoverAsFirstSlide) {
      slide.add(document.querySelector(this.pageCoverSelector))
      slide.add(document.querySelector(this.pageTitleAndPropSelector))
    }

    const notionPageBlocks = Array.from(
      document.querySelectorAll(this.blockSelector)
    )

    let internalSlides = []

    notionPageBlocks.forEach((it, i, arr) => {
      if (isNotIncludes(it.className, this.separatorBlocks)) {
        slide.add(it)
      } else {
        if (slide.blocks.length > 0) internalSlides.push(slide)
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
