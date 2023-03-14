import "simpledotcss/simple.min.css";
import "./popup.css";
import content from "./content?script";
import { getSyncStorage, setSyncStorage } from "./lib/Util";
import { Options } from "./lib/Options";

const restoreOptions = async () => {
  const savedOptions = await getSyncStorage("options");
  return new Options(savedOptions) ?? new Options();
};

const saveOptionsToStorage = async (options, tab) => {
  if (tab && tab.url.includes("notion.so")) {
    options.enableKeyboard = false;
  }
  await setSyncStorage({
    options: options,
  });
};

const patchOptions = async (value, propertyName) => {
  const options = await restoreOptions();
  options[propertyName] = value;
  await saveOptionsToStorage(options, null);
};

const executeScript = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.url.includes("notion.site") || tab.url.includes("notion.so")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: [content],
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () =>
        alert("Please open *.notion.site or *.notion.so and click again!"),
    });
  }
  window.close();
};

const createApp = async () => {
  const options = await restoreOptions();
  document.querySelector("#app").innerHTML = `
  <p style="display: none">
    <label>Zoom:</label>
    <select id="zoom">
      <option value="1" ${options.zoom === "1" ? "selected" : ""}>100%</option>
      <option value="1.25" ${
        options.zoom === "1.25" ? "selected" : ""
      }>125%</option>
      <option value="1.5" ${
        options.zoom === "1.5" ? "selected" : ""
      }>150%</option>
      <option value="1.75" ${
        options.zoom === "1.75" ? "selected" : ""
      }>175%</option>
      <option value="2" ${options.zoom === "2" ? "selected" : ""}>200%</option>
    </select>
  </p>
  <p style="display: none">
    <label>
    <input type="checkbox" id="startInFullScreen" ${
      options.startInFullScreen ? "checked" : ""
    }>
    Start in full screen
    </label>
  </p>   
  <p>
    <label>
    <input type="checkbox" id="useCoverAsFirstSlide" ${
      options.useCoverAsFirstSlide ? "checked" : ""
    }>
    Use cover as first slide
    </label>
  </p>  
  <p>
    <label>
    <input type="checkbox" id="enableKeyboard" ${
      options.enableKeyboard ? "checked" : ""
    }>
    Enable KeyControl <small>*notion.site only</small>
    </label>
  </p>
  <details>
    <summary>Show more options</summary>
    <p>
      <label for="separatorsBlocks">Separators:</label>
      <select name="separatorsBlocks" id="separatorsBlocks" multiple>
       <option value="notion-header-block" ${
         options.separatorsBlocks.includes("notion-header-block")
           ? "selected"
           : ""
       }>H1</option>    
       <option value="notion-sub_header-block" ${
         options.separatorsBlocks.includes("notion-sub_header-block")
           ? "selected"
           : ""
       }>H2</option>
       <option value="notion-sub_sub_header-block" ${
         options.separatorsBlocks.includes("notion-sub_sub_header-block")
           ? "selected"
           : ""
       }>H3</option>
       <option value="notion-divider-block" ${
         options.separatorsBlocks.includes("notion-divider-block")
           ? "selected"
           : ""
       }>Divider</option>
      </select>
    </p>    
  </details>
  <button id="start">Start Slide Show</button>
`;
};

createApp().then(() => {
  document.querySelector("#zoom").addEventListener("change", async (event) => {
    await patchOptions(event.target.value, "zoom");
  });
  document
    .querySelector("#useCoverAsFirstSlide")
    .addEventListener("change", async (event) => {
      await patchOptions(event.target.checked, "useCoverAsFirstSlide");
    });
  document
    .querySelector("#enableKeyboard")
    .addEventListener("change", async (event) => {
      await patchOptions(event.target.checked, "enableKeyboard");
    });
  document
    .querySelector("#separatorsBlocks")
    .addEventListener("change", async (event) => {
      const classNames = Array.from(
        event.target.querySelectorAll(":checked")
      ).map((it) => it.value);
      await patchOptions(classNames, "separatorsBlocks");
    });
  document.querySelector("#start").addEventListener("click", executeScript);
});
