import "simpledotcss"

import { useStorage } from "@plasmohq/storage/dist/hook"

const OptionsIndex = () => {
  const [enableAutoSlideshow, setEnableAutoSlideshow] = useStorage(
    "enableAutoSlideshow",
    false
  )

  const [enableReadAloud, setEnableReadAloud] = useStorage(
    "enableReadAloud",
    false
  )

  const [azureTextToSpeechKey, setAzureTextToSpeechKey] = useStorage(
    "azureTextToSpeechKey",
    ""
  )

  const [azureTextToSpeechLanguage, setAzureTextToSpeechLanguage] = useStorage(
    "azureTextToSpeechLanguage",
    "ja-JP"
  )

  const [azureTextToSpeechRegion, setAzureTextToSpeechRegion] = useStorage(
    "azureTextToSpeechRegion",
    "eastus"
  )

  const [azureTextToSpeechVoiceName, setAzureTextToSpeechVoiceName] =
    useStorage("azureTextToSpeechVoiceName", "ja-JP-DaichiNeural")

  const [hailingFrequency, _, { setRenderValue, setStoreValue }] = useStorage(
    "speakTextReplaceRules"
  )

  const parseCsvToArray = async (csvText) => {
    return csvText.split("\n").map((row) => row.split(","))
  }

  return (
    <div>
      <h1>Notion Presentation Advanced Options</h1>
      <p className={"notice"}>
        <strong>Notice:</strong> This extension is still in development. Please
        report any bugs or feature requests
      </p>
      <p>
        <label>
          <input
            type={"checkbox"}
            checked={enableAutoSlideshow}
            onChange={(e) => setEnableAutoSlideshow(e.target.checked)}
          />
          Auto Slideshow
        </label>
      </p>
      <p>
        <label>
          <input
            type={"checkbox"}
            checked={enableReadAloud}
            onChange={(e) => setEnableReadAloud(e.target.checked)}
          />
          Enable ReadAloud
        </label>
      </p>
      <details>
        <summary>Advanced Settings</summary>
        <strong>Azure Text to Speech</strong>
        <p>
          <label>
            Subscription key:
            <input
              onChange={(e) => setAzureTextToSpeechKey(e.target.value)}
              value={azureTextToSpeechKey}
            />
          </label>
        </p>
        <p>
          <label>
            Region:
            <input
              onChange={(e) => setAzureTextToSpeechRegion(e.target.value)}
              value={azureTextToSpeechRegion}
            />
          </label>
        </p>
        <p>
          <label>
            Voice name:
            <input
              onChange={(e) => setAzureTextToSpeechVoiceName(e.target.value)}
              value={azureTextToSpeechVoiceName}
            />
          </label>
        </p>
        <p>
          <label>
            Language:
            <input
              onChange={(e) => setAzureTextToSpeechLanguage(e.target.value)}
              value={azureTextToSpeechLanguage}
            />
          </label>
        </p>
        <fieldset>
          <legend>Speak text replace rules</legend>
          <p>
            <textarea
              placeholder={"Notion,Notion"}
              value={hailingFrequency}
              onChange={(e) => setRenderValue(e.target.value)}
            />
            <button onClick={() => setStoreValue()}>Save rules</button>
          </p>
        </fieldset>
      </details>
    </div>
  )
}

export default OptionsIndex
