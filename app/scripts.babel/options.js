'use strict';

console.log('Make VersionOne more adorable');

function restore_options() {
  chrome.storage.sync.get({
    columnsToHide: '1057, 137, 1063',
    epicsToHide: '197443,207470'
  }, function(items) {
    document.getElementById('columns').value = items.columnsToHide;
    document.getElementById('epics').value = items.epicsToHide;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);

function save_options() {
  var columns = document.getElementById('columns').value;
  console.log(`columns: ${columns}`)
  var epics = document.getElementById('epics').value;
  console.log(`epics: ${epics}`)

  chrome.storage.sync.set({
    columnsToHide: columns,
    epicsToHide: epics
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

document.getElementById('save').addEventListener('click', save_options);
