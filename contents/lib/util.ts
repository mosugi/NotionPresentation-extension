export const isIncludes = (target, arr) =>
  target ? arr.some((el) => target.includes(el)) : false
export const isNotIncludes = (target, arr) => !isIncludes(target, arr)
export const setStyle = (selector, prop, value) => {
  const target = document.querySelector(selector)
  setElementStyle(target, prop, value)
}
export const setElementStyle = (target, prop, value) => {
  if (target) target.style[prop] = value
}
export const objToList = (obj) =>
  Object.entries(obj).map(([key, value]) => ({ key, value }))
export const isNotionSite = () => location.hostname.includes("notion.site")
export const isNotionSo = () => location.hostname.includes("notion.so")
export const objStartsWith = (obj, searchString) =>
  Object.entries(obj).filter((it) => it[0].startsWith(searchString))

export const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout))

export const last = <T>(arr: T[]): T => {
  return arr[arr.length - 1]
}

export const first = <T>(arr: T[]): T => {
  return arr[0]
}

export const lastFlat = (arr: any[]): any => {
  const flattened = arr.flat()
  return last(flattened)
}

export const firstFlat = (arr: any[]): any => {
  const flattened = arr.flat()
  return first(flattened)
}
