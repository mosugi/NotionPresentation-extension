import * as sdk from "microsoft-cognitiveservices-speech-sdk"

const browserSpeechSynthesis = (text) => {
  return new Promise((resolve, reject) => {
    speechSynthesis.cancel()
    let u = new SpeechSynthesisUtterance(text)
    u.onend = resolve
    u.onerror = reject
    speechSynthesis.speak(u)
  })
}

const azureSpeechSynthesis = (phraseText) => {
  let player = new sdk.SpeakerAudioDestination()
  let audioConfig = sdk.AudioConfig.fromSpeakerOutput(player)
  let speechConfig = sdk.SpeechConfig.fromSubscription(
    "",
    "eastus"
  )
  speechConfig.speechSynthesisLanguage = "ja-JP"
  speechConfig.speechSynthesisVoiceName = "ja-JP-DaichiNeural"

  let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig)

  return new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(
      phraseText,
      function (result) {
        synthesizer.close()
        synthesizer = undefined
        player.onAudioEnd = function () {
          resolve(result)
        }
      },
      function (err) {
        console.log(err)
        synthesizer.close()
        reject(err)
      }
    )
  })
}

export const blockToSpeech = async (text) => {
  const textToSpeech = normalize(text)
  if (textToSpeech !== "") {
    // await speechSynthesisUtterance(textToSpeech).catch(console.error)
    await azureSpeechSynthesis(textToSpeech).catch(console.error)
  }
}

const normalize = (text) => {
  return (text || "")
    .replace(
      /[^a-zA-Z0-9-\u4e00-\u9FFF\u3041-\u3096\u30A1-\u30FC\u3000-\u303F]/g,
      ""
    )
    .trim()
}
