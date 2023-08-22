import { sendToBackground } from "@plasmohq/messaging"

export const resetToActualSize = async () => {
  const res = await sendToBackground({
    name: "setZoom",
    body: { zoomFactor: 1 }
  })
  return res.text
}
