import * as sdk from "microsoft-cognitiveservices-speech-sdk"

import { Storage } from "@plasmohq/storage"

const browserSpeechSynthesis = (text) => {
  return new Promise((resolve, reject) => {
    speechSynthesis.cancel()
    let u = new SpeechSynthesisUtterance(text)
    u.onend = resolve
    u.onerror = reject
    speechSynthesis.speak(u)
  })
}

type AzureSpeechSynthesisConfig = {
  subscriptionKey: string
  region: string
  voiceName: string
  language: string
}

const getAzureSpeechSynthesisConfig =
  async (): Promise<AzureSpeechSynthesisConfig> => {
    const storage = new Storage()
    const subscriptionKey = await storage.get("azureTextToSpeechKey")
    const region = await storage.get("azureTextToSpeechRegion")
    const voiceName = await storage.get("azureTextToSpeechVoiceName")
    const language = await storage.get("azureTextToSpeechLanguage")

    return {
      subscriptionKey: subscriptionKey,
      region: region || "eastus",
      voiceName: voiceName || "ja-JP-DaichiNeural",
      language: language || "ja-JP"
    }
  }

const azureSpeechSynthesis = async (phraseText, config) => {
  // TODO 複数同時に稼働してしまうためシングルトンにする
  let player = new sdk.SpeakerAudioDestination()
  let audioConfig = sdk.AudioConfig.fromSpeakerOutput(player)
  let speechConfig = sdk.SpeechConfig.fromSubscription(
    config.subscriptionKey,
    config.region
  )
  speechConfig.speechSynthesisLanguage = config.language
  speechConfig.speechSynthesisVoiceName = config.voiceName

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
  console.log(textToSpeech)
  if (textToSpeech !== "") {
    const config = await getAzureSpeechSynthesisConfig()
    console.log(config)
    if (config.subscriptionKey) {
      await azureSpeechSynthesis(textToSpeech, config).catch(console.error)
    } else {
      await browserSpeechSynthesis(textToSpeech).catch(console.error)
    }
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
