import "./popup.css";
import presentation from "./content?script";

document.querySelector("#app").innerHTML = `
  <button id="start">Start Presentation</button>
`;

const executeScript = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.url.includes("notion.site") || tab.url.includes("notion.so")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: [presentation],
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => alert("Please open *.notion.site or *.notion.so and click again!"),
    });
  }
};

document.querySelector("#start").addEventListener("click", executeScript);
