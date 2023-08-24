import { playPageAudios } from "~contents/lib/audio"
import type { SlideBlock } from "~contents/lib/block"
import {
  hideBlock,
  isActionBlock,
  isNotHiddenBlock,
  showBlock
} from "~contents/lib/block"
import { blockToSpeech } from "~contents/lib/textToSpeech"
import { setElementStyle } from "~contents/lib/util"
import { playPageVideos } from "~contents/lib/video"
import { getSlideStyles } from "~types/BlockOption"

export const showSlideBlocks = (slide: Slide) => {
  slide?.filter(isActionBlock).forEach((it) => {
    it.target.style.animation = "none"
    if (
      it.option.style !== "Nothing" &&
      it.option.style !== "Scroll Into View" &&
      !it.option?.isReadAloud
    ) {
      it.target.style.animationPlayState = "paused"
      it.target.style.visibility = "hidden"
    }
  })
  slide?.filter(isNotHiddenBlock).map(showBlock)
  // TODO 壊れやすい指定の仕方
  document.querySelector(".pseudoSelection")?.scrollIntoView()
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
  if (block.option.style === "Scroll Into View") {
    block.target.scrollIntoView({ behavior: "smooth" })
  }
  setElementStyle(block.target, "visibility", "visible")
  setElementStyle(block.target, "animationDuration", "1s")
  setElementStyle(block.target, "animationPlayState", "running")

  block.target.offsetHeight // force reflow
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
  await playPageVideos(block)
  await playPageAudios(block)
}

export type Slide = SlideBlock[]
