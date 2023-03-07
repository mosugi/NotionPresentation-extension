import "./popup.css";
import { startPresentation } from "./content";

document.querySelector("#app").innerHTML = `
  <button id="start">Start Presentation</button>
`;

const executeScript = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.url.includes("notion.site") || tab.url.includes("notion.so")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: startPresentation,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: startPresentation,
      // function: () => alert("Please open *.notion.site or *.notion.so and click again!"),
    });
  }
};

document.querySelector("#start").addEventListener("click", executeScript);
