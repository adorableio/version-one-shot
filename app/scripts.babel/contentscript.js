'use strict';

document.onkeypress = function(e) {
  if (e.charCode === 118) { // 'v'
    one_shot();
  }
};

function one_shot() {
  prettify_card_details();
  remove_columns();
  remove_epics();
}

function prettify_card_details() {
  // prettify card details
  $('.fields .custom-fields .group, .expander, .collapser').hide();
  $('.collapsed-text').css({
    'max-height': 'inherit',
    'font-size': '1.25em',
    'margin': '0.5em'
  });
}

function remove_column(header_token, colid) {
  let headers = document.querySelectorAll(`[data-token='${header_token}']`),
      column  = document.querySelector(`[colid='${colid}']`);
  if (column !== null) {
    Array.from(headers).forEach(function(h) { h.remove(); });
    column.remove();
  }
}

function remove_columns() {
  chrome.storage.sync.get('columnsToHide', function(items) {
    let column_collection = items.columnsToHide.split(',');

    column_collection.forEach(function(number) {
      number = number.trim();
      remove_column(`StoryStatus${number}`, `StoryStatus:${number}`);
    });
  });
  remove_column('NULL', 'NULL');
}


function remove_epic(epic_token) {
  let epics = document.querySelectorAll(`a[rel='${epic_token}']`)
  Array.from(epics).forEach(function(e) {
    e.parentNode.parentNode.remove();
  });
}

function remove_epics() {
  chrome.storage.sync.get('epicsToHide', function(items) {
    let epic_collection = items.epicsToHide.split(',');

    epic_collection.forEach(function(number) {
      number = number.trim();
      remove_epic(`Epic:${number}`);
    });
  });
}

one_shot();
