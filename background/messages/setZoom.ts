import type { PlasmoMessaging } from "@plasmohq/messaging"

const setZoom = async (zoomFactor: number) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return await chrome.tabs.setZoom(tab.id, zoomFactor)
}
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const zoomFactor = req.body.zoomFactor
  await setZoom(zoomFactor)
  res.send({
    text: true
  })
}

export default handler
