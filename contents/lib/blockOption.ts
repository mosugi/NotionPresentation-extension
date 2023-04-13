import type { BlockOption } from "~types/BlockOption"

const isNotionBlockOption = ([key, _]: string[]) => key.startsWith("notion-")

const toBlockOption = ([key, value]: string[]) => {
  return [
    `notion-selectable ${key}` as string,
    JSON.parse(value) as BlockOption
  ]
}

export const fromStorageAll = (data: { [p: string]: any }) => {
  return Object.entries(data)
    .filter(isNotionBlockOption)
    .map(toBlockOption)
    .reduce(
      (map, [key, value]) => map.set(key as string, value as BlockOption),
      new Map<string, BlockOption>()
    )
}
