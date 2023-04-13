import type { SlideBlock } from "~contents/lib/block"
import {
  hideBlock,
  isActionBlock,
  isNotHiddenBlock,
  showBlock
} from "~contents/lib/block"
import { setElementStyle } from "~contents/lib/util"
import { getSlideStyles } from "~types/BlockOption"

export const showSlideBlocks = (slide: Slide) => {
  slide?.filter(isActionBlock).forEach((it) => {
    it.target.style.animationName = "initial" // slideのanimationを解除
    it.target.style.animationDuration = "initial" // slideのanimationを解除
    it.target.style.opacity = "0"
  })
  slide?.filter(isNotHiddenBlock).map(showBlock)
}

export const hideSlideBlocks = (slide: Slide) => slide?.map(hideBlock)

export const applyOption = (block: SlideBlock) => {
  if (!block?.option) return
  getSlideStyles(block.option.style).map((it) =>
    setElementStyle(block.target, it.prop, it.value)
  )

  console.log(block.option.isReadAloud)
  setElementStyle(block.target, "opacity", "1")
}

export type Slide = SlideBlock[]
