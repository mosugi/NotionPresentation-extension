import type { BlockType } from "notion-types"

type Style = {
  prop: string
  value: string
}

export type ActionBlock = {
  blockType: BlockType
  style: string
  styles: Style[]
  useAsSeparator: boolean
  isReadAloud: boolean
}
