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
  hide_columns();
  toggle_epic_cards();

  chrome.storage.onChanged.addListener(handle_storage_changes);
}

function prettify_cards() {
  let card_css = `
    .number {
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

function hide_columns() {
  chrome.storage.sync.get('columnsToHide', function(items) {
    let column_collection = items.columnsToHide.split(',')
                            .map(function(i) { return i.trim(); });
    let css = generate_column_hiding_css(column_collection);
    add_css_to_document(css);
  });
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
}

function hide_epic(epic_token) {
  let epics = document.querySelectorAll(`a[rel='${epic_token}']`)
  Array.from(epics).forEach(function(e) {
    var node = e.parentNode.parentNode;
    window.v1hiddenEpics.push(node);
    node.style.display = 'none';
  });
}

function hide_epics() {
  chrome.storage.sync.get('epicsToHide', function(items) {
    let epic_collection = items.epicsToHide.split(',');

    window.v1hiddenEpics = [];

    epic_collection.forEach(function(number) {
      number = number.trim();
      hide_epic(`Epic:${number}`);
    });
  });
}

function show_epics() {
  var node;
  while (node = window.v1hiddenEpics.pop()) {
    node.style.display = '';
  }
}

function toggle_epics(hide) {
  if (hide) {
    hide_epics();
  } else {
    show_epics();
  }
}

function toggle_epic_cards() {
  chrome.storage.sync.get({ hideEpicCards: true }, function(items) {
    if (items.hideEpicCards) {
      hide_epics();
    } else {
      show_epics();
    }
  });
}

function handle_storage_changes(changes) {
  for (var key in changes) {
    if (key === 'hideEpicCards') {
      toggle_epic_cards();
    }
  }
}

one_shot();
