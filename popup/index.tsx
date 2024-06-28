import "simpledotcss"
import "./style.css"

import { useState } from "react"

import { sendToContentScript } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { isNotionBlockOption } from "~contents/lib/blockOption"
import BlockOptionItem, { Props } from "~popup/blockOptionItem"
import { NotionBlock } from "~types/Block"

const callInitPresentation = async () => {
  try {
    const csResponse = await sendToContentScript({
      name: "initPresentation"
    });
    console.log(csResponse);
  } catch (error) {
    console.error("Error sending message to content script:", error);
    alert("Please reload your Notion page.")
  } finally {
    window.close();
  }
}


const restoreBlockOption = async () => {
  const storage = await new Storage()
  const removes = Object.entries(await storage.getAll())
    .filter(isNotionBlockOption)
    .map(async ([key, _]) => await storage.remove(key))
  await Promise.all(removes)
  window.location.reload()
}

const IndexPopup = () => {
  const [zoom, setZoom] = useStorage("zoom", 1)
  const [resetToActualSize, setResetToActualSize] = useStorage(
    "resetToActualSize",
    (v) => (v === undefined ? true : v)
  )
  const [startInFullScreen, setStartInFullScreen] = useStorage(
    "startInFullScreen",
    (v) => (v === undefined ? true : v)
  )
  const [useCoverAsFirstSlide, setUseCoverAsFirstSlide] = useStorage(
    "useCoverAsFirstSlide",
    (v) => (v === undefined ? true : v)
  )
  const [enableOnScreenControl, setEnableOnScreenControl] = useStorage(
    "enableOnScreenControl",
    true
  )
  const [enableKeyboard, setEnableKeyboard] = useStorage("enableKeyboard", true)

  const generateInitialBlockOptions = () => {
    const blocks = Object.values(NotionBlock)
    const blockOptions: Props[] = []
    for (const block of blocks) {
      blockOptions.push({
        block,
        option: {
          style: "No Effect",
          useAsSeparator: block.className === NotionBlock.HeaderBlock.className,
          isReadAloud: false
        }
      })
    }
    return blockOptions
  }

  const [blockOptions, _] = useState<Props[]>(generateInitialBlockOptions())

  const blockOptionItems = blockOptions.map((it) => (
    <BlockOptionItem
      key={it.block.className}
      block={it.block}
      option={it.option}
    />
  ))

  return (
    <div>
      <p>
        <label>
          Start by zooming in:
          <select
            name="zoom"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}>
            <option value="1">100%</option>
            <option value="1.1">110%</option>
            <option value="1.25">125%</option>
            <option value="1.5">150% (Recommend)</option>
            <option value="1.75">175%</option>
            <option value="2">200%</option>
          </select>
        </label>
        <label>
          <input
            type={"checkbox"}
            checked={resetToActualSize}
            onChange={(e) => setResetToActualSize(e.target.checked)}
          />
          Reset size after presentation
        </label>
      </p>
      <p>
        <label>
          <input
            type={"checkbox"}
            checked={startInFullScreen}
            onChange={(e) => setStartInFullScreen(e.target.checked)}
          />
          Start in full screen
        </label>
      </p>
      <p>
        <label>
          <input
            type={"checkbox"}
            checked={useCoverAsFirstSlide}
            onChange={(e) => setUseCoverAsFirstSlide(e.target.checked)}
          />
          Use cover as first slide
        </label>
      </p>
      <p>
        <label>
          <input
            type={"checkbox"}
            checked={enableOnScreenControl}
            onChange={(e) => setEnableOnScreenControl(e.target.checked)}
          />
          Enable on screen control
        </label>
      </p>
      <p>
        <label>
          <input
            type={"checkbox"}
            checked={enableKeyboard}
            onChange={(e) => setEnableKeyboard(e.target.checked)}
          />
          Enable Keyboard control <small>Alt + ← / → / F, Esc</small>
        </label>
      </p>
      <details>
        <summary>Advanced Settings</summary>
        <strong>Block Options</strong>
        <hr />
        {blockOptionItems}
        <button onClick={restoreBlockOption}>Restore default options</button>
      </details>

      <button onClick={() => callInitPresentation()}>Start Slide Show</button>
    </div>
  )
}

export default IndexPopup
