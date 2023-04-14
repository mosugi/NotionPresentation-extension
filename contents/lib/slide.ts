import type { SlideBlock } from "~contents/lib/block"
import {
  hideBlock,
  isActionBlock,
  isNotHiddenBlock,
  showBlock
} from "~contents/lib/block"
import { blockToSpeech } from "~contents/lib/textToSpeech"
import { setElementStyle } from "~contents/lib/util"
import { getSlideStyles } from "~types/BlockOption"

export const showSlideBlocks = (slide: Slide) => {
  slide?.filter(isActionBlock).forEach((it) => {
    it.target.style.animationName = "initial" // slideのanimationを解除
    it.target.style.animationDuration = "initial" // slideのanimationを解除
    if (it.option.style !== "Nothing" && !it.option?.isReadAloud) {
      it.target.style.opacity = "0"
    }
  })
  slide?.filter(isNotHiddenBlock).map(showBlock)
}

export const hideSlideBlocks = (slide: Slide) => slide?.map(hideBlock)

export const applyOption = async (block: SlideBlock) => {
  if (!block?.option) return
  getSlideStyles(block.option.style).map((it) =>
    setElementStyle(block.target, it.prop, it.value)
  )
  if (block.option.style === "Caption") {
    showBlock(block)
  }
  setElementStyle(block.target, "opacity", "1")
  if (block.option.isReadAloud) {
    await readAloud(block)
  }
}

export const applyAfterOption = (block: SlideBlock) => {
  if (!block?.option) return
  if (block.option.style === "Caption") {
    hideBlock(block)
  }
}

const readAloud = async (block: SlideBlock) => {
  if (block.target.innerText) {
    await blockToSpeech(block.target.innerText)
  }
}

export type Slide = SlideBlock[]
