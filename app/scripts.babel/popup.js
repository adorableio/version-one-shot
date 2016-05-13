'use strict';

var hide_epics_checkbox =   document.getElementById('toggle-cards'),
    epics_container =       document.getElementById('epics-container'),
    epics_list =            document.getElementById('epics-list'),
    hide_columns_checkbox = document.getElementById('toggle-columns'),
    columns_container =     document.getElementById('columns-container'),
    columns_list =          document.getElementById('columns-list'),
    status_message =        document.getElementById('status-message');


document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get({
    hideEpicCards: true,
    hideColumns: true
  }, function(items) {
    if (items.hideEpicCards) {
      hide_epics_checkbox.checked = true;
      toggle_epics_list(true);
    } else {
      toggle_epics_list(false);
    }

    if (items.hideColumns) {
      hide_columns_checkbox.checked = true;
      toggle_columns_list(true);
    } else {
      toggle_columns_list(false);
    }
  });
});

document.getElementById('toggle-cards').addEventListener('change', function(e) {
  toggle_epics_list(e.target.checked);
  chrome.storage.sync.set({
    'hideEpicCards': e.target.checked
  });
});

document.getElementById('toggle-columns').addEventListener('change', function(e) {
  toggle_columns_list(e.target.checked);
  chrome.storage.sync.set({
    'hideColumns': e.target.checked
  });
});

document.getElementById('save-epics').addEventListener('click', function(e) {
  e.preventDefault();

  chrome.storage.sync.set({
    epicsToHide: epics_list.value
  }, function() {
    status_message.textContent = 'Options saved.';
    setTimeout(function() {
      status_message.textContent = '';
    }, 3000);
  });
});

document.getElementById('save-columns').addEventListener('click', function(e) {
  e.preventDefault();

  chrome.storage.sync.set({
    columnsToHide: columns_list.value
  }, function() {
    status_message.textContent = 'Options saved.';
    setTimeout(function() {
      status_message.textContent = '';
    }, 3000);
  });
});

function toggle_epics_list(show_it) {
  if (show_it) {
    chrome.storage.sync.get({ epicsToHide: '' }, function(items) {
      epics_list.value = items.epicsToHide;
    });
    epics_container.classList.remove('hidden');
  } else {
    epics_container.classList.add('hidden');
  }
}

function toggle_columns_list(show_it) {
  if (show_it) {
    chrome.storage.sync.get({ columnsToHide: '' }, function(items) {
      columns_list.value = items.columnsToHide;
    });
    columns_container.classList.remove('hidden');
  } else {
    columns_container.classList.add('hidden');
  }
}

