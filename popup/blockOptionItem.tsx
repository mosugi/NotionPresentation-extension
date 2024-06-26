import { useStorage } from "@plasmohq/storage/hook"

import type { NotionBlock } from "~types/Block"
import type { BlockOption, BlockStyle } from "~types/BlockOption"
import { SlideBlockStyle } from "~types/BlockOption"

const defaultBlockOption: BlockOption = {
  style: "No Effect",
  useAsSeparator: false,
  isReadAloud: false
}

export type Props = {
  block: NotionBlock
  option?: BlockOption
}

const BlockOptionItem = (props: Props) => {
  const [blockOption, setBlockOption] = useStorage<BlockOption>(
    props.block.className,
    (v) => (v === undefined ? props.option ?? defaultBlockOption : v)
  )

  const [enableReadAloud, _] = useStorage("enableReadAloud", false)

  const removeCaption = (v) => (enableReadAloud ? true : v.name != "Caption")

  const blockStyleItems = Object.values(SlideBlockStyle)
    .filter(removeCaption)
    .map((v) => (
      <option value={v.name} key={v.name}>
        {v.name}
      </option>
    ))

  return (
    <div>
      <strong>{props.block.displayName}</strong>
      <p>
        <select
          value={blockOption.style}
          onChange={(e) =>
            setBlockOption({
              style: e.target.value as BlockStyle,
              useAsSeparator: blockOption.useAsSeparator,
              isReadAloud: blockOption.isReadAloud
            })
          }>
          {blockStyleItems}
        </select>
        <label>
          <input
            checked={blockOption.useAsSeparator}
            type="checkbox"
            onChange={(e) =>
              setBlockOption({
                style: blockOption.style,
                useAsSeparator: e.target.checked,
                isReadAloud: blockOption.isReadAloud
              })
            }
          />
          Use as separator
        </label>
        {enableReadAloud && (
          <label>
            <input
              checked={blockOption.isReadAloud}
              type="checkbox"
              onChange={(e) =>
                setBlockOption({
                  style: blockOption.style,
                  useAsSeparator: blockOption.useAsSeparator,
                  isReadAloud: e.target.checked
                })
              }
            />
            Read aloud
          </label>
        )}
      </p>
      <hr />
    </div>
  )
}

export default BlockOptionItem
