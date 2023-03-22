const speechSynthesisUtterance = (text) => {
  return new Promise((resolve, reject) => {
    speechSynthesis.cancel()
    let u = new SpeechSynthesisUtterance(text)
    u.onend = resolve
    u.onerror = reject
    speechSynthesis.speak(u)
  })
}

export const blockToSpeech = async (text) => {
  const textToSpeech = normalize(text)
  if (textToSpeech !== "") {
    await speechSynthesisUtterance(textToSpeech).catch(console.error)
  }
}

// export const speechBlocks = async (blocks, speechClasses, captionClasses) => {
//     for (const it of blocks) {
//         if (isIncludes(it.className, captionClasses)) {
//             showCaption(it);
//         }
//
//         if (
//             isIncludes(it.className, speechClasses) &&
//             normalize(it.innerText) !== ""
//         ) {
//             await speechSynthesisUtterance(normalize(it.innerText)).catch(
//                 console.error
//             );
//         }
//
//         if (isIncludes(it.className, captionClasses)) {
//             hideCaption(it);
//         }
//     }
// };

const normalize = (text) => {
  return (text || "")
    .replace(
      /[^a-zA-Z0-9-\u4e00-\u9FFF\u3041-\u3096\u30A1-\u30FC\u3000-\u303F]/g,
      ""
    )
    .trim()
}
