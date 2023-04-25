import type { SlideBlock } from "~contents/lib/block"

export const playPageAudios = async (block: SlideBlock) => {
  const audioBlocks = block?.target?.querySelectorAll("audio")
  for (const it of audioBlocks) {
    await playAudio(it)
  }
}

const playAudio = (audio) => {
  return new Promise((resolve, reject) => {
    audio.onended = resolve
    audio.onerror = reject
    audio.play()
  })
}
