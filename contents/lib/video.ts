import type { SlideBlock } from "~contents/lib/block"
import type { Slide } from "~contents/lib/slide"
import { NotionBlock } from "~types/Block"

export const playPageVideos = async (block: SlideBlock) => {
  const videoBlocks = block?.target.querySelectorAll("video")
  for (const it of videoBlocks) {
    await playVideo(it)
  }
}

const playVideo = (video) => {
  return new Promise((resolve, reject) => {
    video.onended = resolve
    video.onerror = reject
    // video.requestFullscreen().catch() // ここでフルスクリーンにできるが、戻すと全体のフルスクリーンも切れるので多分拡大の方が良い
    video.play()
  })
}
