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

function hide_columns(columns_list) {
  let style = document.createElement('style');
  style.tyle = 'text/css';
  let formatted_targets = columns_list.map(function(col) {
    return `[colid='${col.colid}'], [data-token='${col.data_token}']`;
  }).join(', ');
  let style_text = `
    ${formatted_targets} {
      display: none;
    }
  `;
  style.innerHTML = style_text;
  document.getElementsByTagName('head')[0].appendChild(style);
}

function remove_columns() {
  chrome.storage.sync.get('columnsToHide', function(items) {
    let column_collection = items.columnsToHide.split(',');
    let none_column = {
      data_token: 'NULL',
      colid: 'NULL'
    };

    let removal_targets = column_collection.map(function(number) {
      number = number.trim();
      return {
        data_token: `StoryStatus${number}`,
        colid: `StoryStatus:${number}`
      };
    }).concat(none_column);

    hide_columns(removal_targets);
  });
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
