import type { Slide } from "~contents/lib/slide"
import { NotionBlock } from "~types/Block"

export const playPageVideos = async (slide: Slide) => {
  const videoBlocks = slide.filter((it) =>
    it?.target?.className?.includes(NotionBlock.VideoBlock.className)
  )

  for (const it of videoBlocks) {
    const video = it.target.querySelector("video")
    if (video) {
      await playVideo(video)
    }
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
