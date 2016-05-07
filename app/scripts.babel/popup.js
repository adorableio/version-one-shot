'use strict';

document.addEventListener('DOMContentLoaded', function() {
  var hide_epics_checkbox = document.getElementById('toggle-cards');
  chrome.storage.sync.get({ hideEpicCards: true }, function(items) {
    hide_epics_checkbox.checked = items.hideEpicCards;
  });

});

document.getElementById('toggle-cards').addEventListener('change', function(e) {
  chrome.storage.sync.set({
    'hideEpicCards': e.target.checked
  });
});
