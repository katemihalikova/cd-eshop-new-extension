(() => {
  "use strict";

  let s = document.createElement('script');
  s.src = chrome.extension.getURL('script.js');
  document.documentElement.appendChild(s);
  s.onload = () => s.parentNode.removeChild(s);
})();
