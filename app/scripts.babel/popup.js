'use strict';

var hide_epics_checkbox = document.getElementById('toggle-cards'),
    epics_list =          document.getElementById('epics-list');


document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get({ hideEpicCards: true }, function(items) {
    if (items.hideEpicCards) {
      hide_epics_checkbox.checked = true;
      toggle_epics_list(true);
    } else {
      toggle_epics_list(false);
    }
  });
});

document.getElementById('toggle-cards').addEventListener('change', function(e) {
  toggle_epics_list(e.target.checked);
  chrome.storage.sync.set({
    'hideEpicCards': e.target.checked
  });
});

function toggle_epics_list(show_it) {
  if (show_it) {
    chrome.storage.sync.get({ epicsToHide: '' }, function(items) {
      epics_list.value = items.epicsToHide;
    });
    epics_list.classList.remove('hidden');
  } else {
    epics_list.classList.add('hidden');
  }
}
