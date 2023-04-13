import { isNotIncludes } from "~contents/lib/util"
import type { BlockOption } from "~types/BlockOption"
import { SlideBlockStyle } from "~types/BlockOption"

export type SlideBlock = {
  target: HTMLElement
  option?: BlockOption
}

export const isSeparator = (block: SlideBlock) => block.option?.useAsSeparator

export const isHiddenBlock = (block: SlideBlock) =>
  block.option?.style === SlideBlockStyle.Hide.name

export const isNotHiddenBlock = (block: SlideBlock) => !isHiddenBlock(block)

export const isActionBlock = (block: SlideBlock) =>
  (block.option &&
    isNotIncludes(block.option?.style, [
      SlideBlockStyle.Hide.name,
      SlideBlockStyle.None.name
    ])) ||
  block.option?.isReadAloud === true

export const showBlock = (block: SlideBlock) =>
  (block.target.style.display = "block")

export const hideBlock = (block: SlideBlock) =>
  (block.target.style.display = "none")
