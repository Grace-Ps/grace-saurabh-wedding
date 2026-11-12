const SPREADSHEET_ID = '1sLiGHU_JmW9JVww9GGvI1Id_ws6MEs1WsYZQcr1-7Gk';

function doPost(event) {
  const parameters = event?.parameter || {};
  const name = String(parameters.name || 'Anonymous').trim().slice(0, 80) || 'Anonymous';
  const message = String(parameters.message || '').trim().slice(0, 500);

  if (parameters.website || !message) {
    return submissionResponse_('ignored');
  }

  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Wishes') || spreadsheet.insertSheet('Wishes');
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Submitted at', 'Name', 'Message']);
        sheet.setFrozenRows(1);
      }
      sheet.appendRow([new Date(), name, message]);
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    console.error(error);
    return submissionResponse_('failed');
  }

  return submissionResponse_('saved');
}

function testSpreadsheetConnection() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log(`Connected to spreadsheet: ${spreadsheet.getName()}`);
}

function submissionResponse_(status) {
  const response = `<script>window.top.postMessage({source: 'wedding-guestbook', status: '${status}'}, '*');</script>`;
  return HtmlService.createHtmlOutput(response)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}