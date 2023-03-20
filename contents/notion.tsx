import type { BlockType } from "notion-types"
import type { PlasmoCSConfig } from "plasmo"

import { useMessage } from "@plasmohq/messaging/hook"
import { Storage } from "@plasmohq/storage"

import { requestFullScreen } from "~contents/lib/FullScreen"
import { addKeyDownListener } from "~contents/lib/KeyControl"
import { addOnScreenControl } from "~contents/lib/OnScreenControl"
import { SlideControl } from "~contents/lib/SlideControl"
import { Slideshow } from "~contents/lib/Slideshow"
import {
  hideControls,
  insertAnimationStyles,
  styleFirstPage
} from "~contents/lib/Style"
import { isIncludes, objToList } from "~contents/lib/Util"
import { NotionBlock } from "~types/Block"
import type { BlockOption } from "~types/BlockOption"

export const config: PlasmoCSConfig = {
  matches: ["*://*.notion.so/*", "*://*.notion.site/*"]
}

async function startPresentation() {
  const storage = new Storage()
  const useCoverAsFirstSlide =
    (await storage.get<boolean>("useCoverAsFirstSlide")) ?? true

  const startInFullScreen =
    (await storage.get<boolean>("startInFullScreen")) ?? true

  const storageAll = await storage.getAll()

  const blockOptionsTemp = objToList(storageAll).filter((it) =>
    isIncludes(
      it.key,
      Object.values(NotionBlock).map((it) => it.className)
    )
  )
  const blockOptions = blockOptionsTemp.map((it) => {
    return {
      key: it.key as BlockType,
      value: JSON.parse(it.value as string) as BlockOption
    }
  })

  const slideshow = new Slideshow(useCoverAsFirstSlide, blockOptions)

  hideControls()
  styleFirstPage(useCoverAsFirstSlide)
  insertAnimationStyles()

  const slideControl = new SlideControl(slideshow)
  addOnScreenControl(slideControl)
  const enableKeyboard = (await storage.get<boolean>("enableKeyboard")) ?? false
  addKeyDownListener(slideControl, enableKeyboard)

  if (startInFullScreen) {
    requestFullScreen()
  }
  slideshow.start()
}

const notion = () => {
  useMessage<string, string>(async (req, res) => {
    await startPresentation()
    res.send(`${req.name} received.`)
  })
  // TODO .notion-topbarからも起動できるようボタン追加する
  return <div></div>
}

export default notion
