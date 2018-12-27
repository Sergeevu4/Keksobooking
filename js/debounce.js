'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 300; // ms
  var lastTimeout;

  function debounce(callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  }

  window.debounce = debounce;

})();
