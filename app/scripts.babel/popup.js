'use strict';

console.log('hi');

document.getElementById('toggle-cards').addEventListener('change', function(e) {
  chrome.storage.sync.set({
    'hideEpicCards': e.target.checked
  });
});
