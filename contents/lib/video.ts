import {NotionBlock} from "~types/Block";
import type {Slide} from "~contents/lib/slide";

export const playPageVideos = async (slide:Slide) => {
  const videoBlocks = slide.filter((it) =>
    it?.target?.className?.includes(NotionBlock.VideoBlock.className)
  )
  console.log(slide)
  console.log(videoBlocks)

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
