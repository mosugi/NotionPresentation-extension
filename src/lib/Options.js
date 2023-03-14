import { getSyncStorage } from "./Util";

export class Options {
  constructor(options) {
    this.zoom = options?.zoom ?? 1;
    this.startInFullScreen = options?.startInFullScreen ?? false;
    this.useCoverAsFirstSlide = options?.useCoverAsFirstSlide ?? true;
    this.separatorsBlocks = options?.separatorsBlocks ?? [
      "notion-header-block",
    ];
    this.hiddenBlocks = options?.hiddenBlocks ?? [];
    this.enableKeyboard = options?.enableKeyboard ?? true;
    // this.speechBlocks = options?.speechBlocks ?? [];
    // this.animationBlocks = options?.animationBlocks ?? [];
  }
}

const fromSyncStorage = async () => {
  const options = await getSyncStorage("options");
  return new Options(options);
};

const options = await fromSyncStorage();
export default options;
