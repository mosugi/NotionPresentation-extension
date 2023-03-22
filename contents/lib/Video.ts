export const playPageVideos = async (blocks) => {
  const videoBlocks = blocks.filter((it) =>
    it.className.includes("notion-video-block")
  )

  for (const it of videoBlocks) {
    const video = it.querySelector("video")
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
