import { useStorage } from "@plasmohq/storage/hook"

import type { NotionBlock } from "~types/Block"
import type { BlockOption, BlockStyle } from "~types/BlockOption"

const defaultBlockOption: BlockOption = {
  style: "none" as BlockStyle,
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
  return (
    <section>
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
          {/*TODO enumから生成したい*/}
          <option value={"none" as BlockStyle}>Style: none</option>
          <option value={"fade" as BlockStyle}>Style: Fade in</option>
          <option value={"slide" as BlockStyle}>Style: Slide in</option>
          <option value={"caption" as BlockStyle}>Style: Caption</option>
          <option value={"hide" as BlockStyle}>Style: Hidden</option>
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
      </p>
    </section>
  )
}

export default BlockOptionItem
