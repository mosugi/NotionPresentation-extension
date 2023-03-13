import "simpledotcss/simple.min.css";
import "./popup.css";
import content from "./content?script";
import { getSyncStorage, setSyncStorage } from "./lib/Util";

const restoreOptions = async () => {
  const defaultOptions = {
    zoom: 1,
    useCoverAsFirstSlide: true,
    separatorsBlocks: ["notion-header-block"],
    hiddenBlocks: [],
    enableKeyboard: true,
  };
  const savedOptions = await getSyncStorage("options");
  return savedOptions ?? defaultOptions;
};

const saveOptionsToStorage = async (options, tab) => {
  if (tab.url.includes("notion.so")) {
    options.enableKeyboard = false;
  }
  await setSyncStorage({
    options: options,
  });
};

const executeScript = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const options = await restoreOptions();
  await saveOptionsToStorage(options, tab);
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

document.querySelector("#app").innerHTML = `
  <button id="start">Start Slide Show</button>
`;
document.querySelector("#start").addEventListener("click", executeScript);
