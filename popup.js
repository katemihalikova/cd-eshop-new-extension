(() => {
  "use strict";

  chrome.tabs.executeScript(null, {code: `
    (() => {
      "use strict";
      let modal = document.querySelector("#connectionParamsModal");
      if (modal) {
        return [
          document.querySelector("select[data-bind*='minChangeTimeOptions']").value,
          document.querySelector("select[data-bind*='maxChangeTimeOptions']").value,
        ];
      }
    })();
  `}, ([result]) => {
    if (result && result.length) {
      [document.querySelector("#min").value, document.querySelector("#max").value] = result.map(e => e === "-1" ? "0" : e);
    }
  });

  document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    chrome.tabs.executeScript(null, {code: `
      (() => {
        "use strict";
        window.postMessage({
          type: "min-max",
          min: "${document.querySelector("#min").value}",
          max: "${document.querySelector("#max").value}",
        }, "*");
      })();
    `});
  });
})();
