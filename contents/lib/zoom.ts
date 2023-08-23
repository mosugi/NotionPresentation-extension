import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

export const resetToActualSize = async () => {
  const storage = await new Storage()
  const resetToActualSize =
    (await storage.get<boolean>("resetToActualSize")) ?? true

  if (!resetToActualSize) {
    return false
  }

  const res = await sendToBackground({
    name: "setZoom",
    body: { zoomFactor: 1 }
  })
  return res.text
}

export const setZoomFromConfig = async () => {
  const storage = await new Storage()
  const zoomFactor = (await storage.get<number>("zoom")) ?? 1

  const res = await sendToBackground({
    name: "setZoom",
    body: { zoomFactor: zoomFactor }
  })
  return res.text
}

export const addBeforeUnloadListener = () => {
  window.addEventListener(
    "beforeunload",
    async () => {
      await resetToActualSize()
    },
    false
  )
}
