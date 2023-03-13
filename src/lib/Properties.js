import { getSyncStorage, setSyncStorage } from "./Util";

class Properties {
  constructor() {
    this.zoom = 1;
    this.useCoverAsFirstSlide = true;
    this.separatorsBlocks = ["notion-header-block"];
    this.hiddenBlocks = [];
    this.enableKeyboard = true;
    // speech
    this.speechBlocks = [];
    this.visibleBlocksWhenSpeech = true;
    // const
    this.blockSelector = ".notion-page-content > .notion-selectable";
    this.pageTitleAndPropSelector =
      ".pseudoSelection:first-of-type + div > div > div";
    this.pageCoverSelector = ".pseudoSelection:first-of-type";
  }
  from(options) {
    this.zoom = options.zoom;
    this.useCoverAsFirstSlide = options.useCoverAsFirstSlide;
    this.separatorsBlocks = options.separatorsBlocks;
    this.hiddenBlocks = options.hiddenBlocks;
    this.enableKeyboard = options.enableKeyboard;
  }
}

const properties = new Properties();
export default properties;

export const setProp = async () => {
  const options = await getSyncStorage("options");
  properties.from(options);
};
