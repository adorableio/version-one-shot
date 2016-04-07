'use strict';

document.onkeypress = function(e) {
  if (e.charCode === 118) { // 'v'
    one_shot();
  }
};

function one_shot() {
  // prettify card details
  $('.fields .custom-fields .group, .expander, .collapser').hide();
  $('.collapsed-text').css({
    'max-height': 'inherit',
    'font-size': '1.25em',
    'margin': '0.5em'
  });

  // hide tappr
  $('a[rel=\'Epic:197443\'], a[rel=\'Epic:207470\']').each(function(idx, el) {
    $(el.parentNode.parentNode).hide();
  });

  // remove columns
  [1057, 137, 1063].forEach(function(number) {
    remove_column(`StoryStatus${number}`, `StoryStatus:${number}`);
  });
  remove_column('NULL', 'NULL');

  function remove_column(header_token, colid) {
    let headers = document.querySelectorAll(`[data-token='${header_token}']`),
        column  = document.querySelector(`[colid='${colid}']`);
    Array.from(headers).forEach(function(h) { h.remove(); });
    column.remove();
  }
}

one_shot();
