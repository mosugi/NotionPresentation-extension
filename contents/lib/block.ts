import { isNotIncludes } from "~contents/lib/util"
import type { BlockOption } from "~types/BlockOption"
import { SlideBlockStyle } from "~types/BlockOption"

export type SlideBlock = {
  target: HTMLElement
  option?: BlockOption
}

export const isSeparator = (block: SlideBlock) => block?.option?.useAsSeparator

export const isHiddenBlock = (block: SlideBlock) =>
  block.option?.style === SlideBlockStyle.Hide.name ||
  block.option?.style === SlideBlockStyle.Caption.name ||
    block.target?.style?.visibility === "hidden" // PageCover

export const isNotHiddenBlock = (block: SlideBlock) => !isHiddenBlock(block)

export const isActionBlock = (block: SlideBlock) =>
  (block.option &&
    isNotIncludes(block.option?.style, [
      SlideBlockStyle.Hide.name,
      SlideBlockStyle.None.name
    ])) ||
  block.option?.isReadAloud === true

export const showBlock = (block: SlideBlock) =>
  block?.target?.style ? (block.target.style.display = "block") : null

export const hideBlock = (block: SlideBlock) =>
  block?.target?.style ? (block.target.style.display = "none") : null
