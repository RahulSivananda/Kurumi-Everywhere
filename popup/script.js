"use strict";
let original = "Show original";
let kurumi = "Show Kurumi";
let btn;
document.addEventListener("click", (e) => {
  btn = e.target;
  if (btn.id === "show") {
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then(sendMessageToTabs);
  }
});

function sendMessageToTabs(tabs) {
  let value = btn.value;
  let val = (value === original) ? kurumi : original;
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id, {
        message: value
      });
  }
  btn.value = val;
}