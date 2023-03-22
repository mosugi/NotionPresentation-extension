import { blockToSpeech } from "~contents/lib/TextToSpeech"
import { setElementStyle } from "~contents/lib/Util"
import type { BlockOption, BlockStyle } from "~types/BlockOption"
import { SlideBlockStyle } from "~types/BlockOption"

type blockWithOption = {
  target: HTMLElement
  style: BlockStyle
  readAloud: boolean
}

export class Slide {
  blocks: any[]
  private blockWithOptionIndex: number
  private blocksWithOption: blockWithOption[]
  private blockOptions: { key: string; value: BlockOption }[]

  constructor(blockOptions: { key: string; value: BlockOption }[]) {
    this.blocks = []
    this.blockWithOptionIndex = 0
    this.blocksWithOption = []
    this.blockOptions = blockOptions
  }
  add(element) {
    this.blocks.push({ target: element })

    const blockOption = this.blockOptions.filter((it) =>
      element.className.includes(it.key)
    )?.[0]

    if (
      blockOption &&
      (blockOption.value.style !== "none" ||
        blockOption.value.isReadAloud === true)
    ) {
      this.blocksWithOption.push({
        target: element,
        style: blockOption.value.style,
        readAloud: blockOption.value.isReadAloud
      })
    }
  }
  showPageBlocks() {
    this.blocksWithOption.forEach((it) => {
      it.target.style.animationName = "initial" // slideのanimationを解除
      it.target.style.animationDuration = "initial" // slideのanimationを解除
      it.target.style.opacity = "0"
    })
    this.blocks.forEach((it) => (it.target.style.display = "block"))
  }
  hidePageBlocks() {
    this.blocks.forEach((it) => (it.target.style.display = "none"))
  }
  hasNextActionBlock() {
    return !!this.blocksWithOption[this.blockWithOptionIndex]
  }
  async doAction() {
    const setStyles = (block: blockWithOption) => {
      const styles = Object.values(SlideBlockStyle)
        .filter((it) => it.name === block.style)
        .flatMap((it) => it.styles)
      styles.map((it) => setElementStyle(block.target, it.prop, it.value))
    }

    const readAloud = async (optionBlock) => {
      console.log(optionBlock)
      if (optionBlock.readAloud)
        await blockToSpeech(optionBlock.target.innerText)
      if (optionBlock.style === "caption")
        setElementStyle(optionSetBlock.target, "display", "none")
    }

    const optionSetBlock = this.blocksWithOption[this.blockWithOptionIndex]

    setStyles(optionSetBlock)
    setElementStyle(optionSetBlock.target, "opacity", "1")

    await readAloud(optionSetBlock)

    this.blockWithOptionIndex = this.blockWithOptionIndex + 1
  }
}
