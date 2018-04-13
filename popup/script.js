(function() {
  "use strict";
  let original = "Show original";
  let kurumi = "Show Kurumi";
  let btn;
  let params = {
    currentWindow: true,
    active: true
  };

  document.addEventListener("click", (e) => {
    btn = e.target;
    if (btn.id === "show") {
      browser.tabs.query(params).then(sendMessageToTabs);
    }
  });

  function sendMessageToTabs(tabs) {
    let value = "toggle"
    let message = {
      message: value
    };
    browser.tabs.sendMessage(tabs[0].id, message);
  }
})();