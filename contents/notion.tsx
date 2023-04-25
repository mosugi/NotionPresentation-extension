import type { PlasmoCSConfig } from "plasmo"

import { useMessage } from "@plasmohq/messaging/hook"
import { Storage } from "@plasmohq/storage"

import { fromStorageAll } from "~contents/lib/blockOption"
import { requestFullScreen } from "~contents/lib/fullScreen"
import { addKeyDownListener } from "~contents/lib/keyControl"
import { addResizeListener } from "~contents/lib/resume"
import { addOnScreenControl } from "~contents/lib/screenControl"
import { createSlideControl } from "~contents/lib/slideControl"
import { createSlides } from "~contents/lib/slideshow"
import {
  hideControls,
  insertAnimationStyles,
  styleFirstPage
} from "~contents/lib/style"
import { isNotionSite, isNotionSo } from "~contents/lib/util"

export const config: PlasmoCSConfig = {
  matches: ["*://*.notion.so/*", "*://*.notion.site/*"]
}

async function startPresentation() {
  const storage = await new Storage()
  const storageAll = await storage.getAll()
  const slideshow = createSlides(
    storageAll.useCoverAsFirstSlide,
    fromStorageAll(storageAll)
  )

  hideControls()
  styleFirstPage(storageAll.useCoverAsFirstSlide)

  const startInFullScreen =
    (await storage.get<boolean>("startInFullScreen")) ?? true
  const enableOnScreenControl =
    (await storage.get<boolean>("enableOnScreenControl")) ?? true
  const enableKeyboard = (await storage.get<boolean>("enableKeyboard")) ?? true

  const slideControl = createSlideControl(slideshow)
  if (enableOnScreenControl || isNotionSo()) addOnScreenControl(slideControl)
  if (enableKeyboard && isNotionSite()) addKeyDownListener(slideControl)

  slideControl.init()

  addResizeListener(slideControl)
  if (startInFullScreen) requestFullScreen()
}

const notion = () => {
  let isPresentationStarted = false
  useMessage<string, string>(async (req, res) => {
    if (isPresentationStarted) {
      console.log("Already started.")
      res.send(`${req.name} received.But already started.`)
      return
    }
    await startPresentation()
    isPresentationStarted = true
    res.send(`${req.name} received.`)
  })

  insertAnimationStyles()

  // TODO .notion-topbarからも起動できるようボタン追加する
  return <div></div>
}

export default notion
