import "simpledotcss"
import "./style.css"

import type { BlockType } from "notion-types"
import { useState } from "react"

import { sendToContentScript } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import BlockOptionItem, { Props } from "~popup/BlockOptionItem"
import type { ActionBlock } from "~types/ActionBlock"
import { NotionBlock } from "~types/Block"

const callInitPresentation = async (zoom) => {
  await setZoom(zoom)
  const csResponse = await sendToContentScript({
    name: "initPresentation"
  })
  console.log(csResponse)
  window.close()
}

const resetSettings = async () => {
  const storage = new Storage()
  await storage.clear()
  window.location.reload()
}

const setZoom = async (zoomFactor: number) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return await chrome.tabs.setZoom(tab.id, zoomFactor)
}

const IndexPopup = () => {
  const [zoom, setZoom] = useStorage("zoom", 1)
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

  const [separatorBlocks, setSeparatorBlocks] = useStorage<BlockType[]>(
    "separatorBlocks",
    (v) => (v === undefined ? ["header-block"] : v)
  )

  const [blockOptions, setBlockOptions] = useState<Props[]>([
    {
      block: NotionBlock.HeaderBlock,
      option: {
        style: "none",
        useAsSeparator: true,
        isReadAloud: false
      }
    },
    {
      block: NotionBlock.SubHeaderBlock
    },
    {
      block: NotionBlock.SubSubHeaderBlock
    },
    {
      block: NotionBlock.DividerBlock
    },
    {
      block: NotionBlock.TextBlock
    },
    {
      block: NotionBlock.SyncBlock
    }
  ])

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
            <option value="1.5">150%</option>
            <option value="1.75">175%</option>
            <option value="2">200%</option>
          </select>
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
          Enable Keyboard control <small>*notion.site only</small>
        </label>
      </p>
      <details>
        <summary>Block Options</summary>
        {blockOptionItems}
        {/*<label>*/}
        {/*Add more custom:*/}
        {/*<select>*/}
        {/*  <option value="1">H3</option>*/}
        {/*  <option value="2">Divider</option>*/}
        {/*  <option value="3">Text</option>*/}
        {/*</select>*/}
        {/*  <button onClick={() => setBlockOptions(blockOptions.reverse)}>Add</button>*/}
        {/*</label>*/}
      </details>

      <button onClick={() => callInitPresentation(zoom)}>
        Start Slide Show
      </button>
      <button onClick={resetSettings}>Reset Settings</button>
    </div>
  )
}

export default IndexPopup
