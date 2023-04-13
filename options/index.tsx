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
      <p>
        <label>
          Azure Text to Speech Key:
          <input
            onChange={(e) => setAzureTextToSpeechKey(e.target.value)}
            value={azureTextToSpeechKey}
          />
        </label>
      </p>
    </div>
  )
}

export default OptionsIndex
