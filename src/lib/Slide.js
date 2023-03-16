import options from "./Options";
import { setElementStyle } from "./Util";

export class Slide {
  constructor() {
    this.blocks = [];
    this.actionBlocks = [];
    this.actionBlockIndex = 0;
  }
  add(element) {
    const blockAction = options.actionBlocksMap.filter((it) =>
      element.className.includes(it.className)
    )?.[0];
    this.blocks.push({ target: element });
    if (blockAction)
      this.actionBlocks.push({
        target: element,
        styles: blockAction.styles,
        readAloud: blockAction.readAloud,
      });
  }
  showPageBlocks() {
    this.actionBlocks.forEach((it) => {
      it.target.style.animationName = "initial"; // slideのanimationを解除
      it.target.style.animationDuration = "initial"; // slideのanimationを解除
      it.target.style.opacity = "0";
    });
    this.blocks.forEach((it) => (it.target.style.display = "block"));
  }
  hidePageBlocks() {
    this.blocks.forEach((it) => (it.target.style.display = "none"));
  }
  hasNextActionBlock() {
    return !!this.actionBlocks[this.actionBlockIndex];
  }
  doAction() {
    const setStyles = (actionBlock) => {
      actionBlock.styles.map((it) =>
        setElementStyle(actionBlock.target, it.prop, it.value)
      );
    };
    const readAloud = (actionBlock) => {
      console.log(actionBlock.readAloud);
    };
    const actionBlock = this.actionBlocks[this.actionBlockIndex];
    setStyles(actionBlock);
    readAloud(actionBlock);
    setElementStyle(actionBlock.target, "opacity", "1");
    this.actionBlockIndex = this.actionBlockIndex + 1;
  }
}
