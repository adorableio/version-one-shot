'use strict';

document.onkeypress = function(e) {
  if (e.charCode === 118) { // 'v'
    one_shot();
  }
};

function one_shot() {
  prettify_card_details();
  prettify_cards();
  prettify_board();
  toggle_columns();
  toggle_epic_cards();

  chrome.storage.onChanged.addListener(handle_storage_changes);
}

function prettify_cards() {
  let card_css = `
    .identity .number {
      background-color: #00A9E0 !important;
    }

    .story-card {
      box-shadow: none !important;
      border: 1px solid #bbb !important;
    }
  `;
  add_css_to_document(card_css);
}

function prettify_board() {
  let board_css = `
    td.status {
      background-color: #ddd !important;
    }

    #page-container .main-content-wrapper {
      margin: 0;
    }

    [gadget='GridFilter'],
    #top-bar,
    .actions.config-btn,
    .asset-tray,
    .filters-and-reports,
    .main-content-nav {
      display: none !important;
    }
  `;
  add_css_to_document(board_css);
}

function prettify_card_details() {
  let details_css = `
    .fields .custom-fields .group, .expander, .collapser {
      display: none !important;
    }

    .collapsed-text, .expandable-text {
      max-height: inherit !important;
      font-size: 16px !important;
      line-height: 1.4em !important;
      margin: 0.5em !important;
    }

    .collapsed-text p, .expandable-text p {
      margin-top: 1.2em;
    }
  `;
  add_css_to_document(details_css);
}

function toggle_columns() {
  chrome.storage.sync.get({ 'hideColumns': true }, function(items) {
    if (items.hideColumns) {
      hide_columns();
    } else {
      show_columns();
    }
  });
}

function hide_columns() {
  chrome.storage.sync.get({ 'columnsToHide': '' }, function(items) {
    if (typeof items.columnsToHide != 'undefined') {
      let column_collection = items.columnsToHide.split(',')
        .map(function(i) { return i.trim(); });
      let css = generate_column_hiding_css(column_collection);
      window.v1_column_hiding_style_el = add_css_to_document(css);
    }
  });
}

function show_columns() {
  var style_el = window.v1_column_hiding_style_el;
  if (style_el) style_el.remove();
}

function generate_column_hiding_css(column_collection) {
  let css_selector = column_collection.map(function(number) {
    return `[colid='StoryStatus:${number}'], [data-token='StoryStatus${number}']`;
  }).concat('[colid=\'NULL\'], [data-token=\'NULL\']')
  .join(', ');

  return `
  ${css_selector} {
    display: none;
  }`;
}

function add_css_to_document(css) {
  let style = document.createElement('style');
  style.innerHTML = css;
  document.getElementsByTagName('head')[0].appendChild(style);
  return style;
}

function toggle_epic_cards() {
  chrome.storage.sync.get({ 'hideEpicCards': true }, function(items) {
    if (items.hideEpicCards) {
      hide_epics();
    } else {
      show_epics();
    }
  });
}

function hide_epics() {
  chrome.storage.sync.get('epicsToHide', function(items) {
    if (typeof items.epicsToHide != 'undefined') {
      let epic_collection = items.epicsToHide.split(',');
      window.v1hiddenEpics = [];

      epic_collection.forEach(function(number) {
        number = number.trim();
        hide_epic(`Epic:${number}`);
      });
    }
  });
}

function hide_epic(epic_token) {
  let epics = document.querySelectorAll(`a[rel='${epic_token}']`)
  Array.from(epics).forEach(function(e) {
    var node = e.parentNode.parentNode;
    window.v1hiddenEpics.push(node);
    node.style.display = 'none';
  });
}

function show_epics() {
  var hidden_epics = window.v1hiddenEpics || [],
      node;

  while (node = hidden_epics.pop()) {
    node.style.display = '';
  }
}

function handle_storage_changes(changes) {
  for (var key in changes) {
    if (key === 'hideEpicCards' || key === 'epicsToHide') {
      toggle_epic_cards();
    }
    if (key === 'hideColumns' || key === 'columnsToHide') {
      toggle_columns();
    }
  }
}

one_shot();
