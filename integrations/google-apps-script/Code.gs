const TARGETS = Object.freeze({
  school: Object.freeze({
    spreadsheetId: "14a9h9NkIjqtXWDTnWS5E3RPXVyEryhMCzog_GIuMUus",
    sheetName: "Аркуш1",
    valueCount: 9,
  }),
  badminton: Object.freeze({
    spreadsheetId: "1CRWpZkvrPHkvii5HNLRRKU9AhWwmU_Bk1oOpD1--olI",
    sheetName: "Аркуш1",
    valueCount: 4,
  }),
  merch_polo: Object.freeze({
    spreadsheetId: "1vNE_niTuRsqTh_IfzxsjJTKR53l3Xb7CnEirOgUk6Yo",
    sheetName: "Аркуш1",
    valueCount: 6,
  }),
  merch_uniform: Object.freeze({
    spreadsheetId: "1MvwuZCxcWkzOttGmY7hgnOOqlCaE4Btwn4mo0_nIZEU",
    sheetName: "Аркуш1",
    valueCount: 6,
  }),
  merch_badminton: Object.freeze({
    spreadsheetId: "1l2OxQ_Fv66KDRlCeaKbu91MnNQAFkf7ux0SjYq5ZMJM",
    sheetName: "Аркуш1",
    valueCount: 6,
  }),
});

function response(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeCell(value) {
  if (typeof value === "number") return value;
  const text = String(value == null ? "" : value).trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

// Запустите эту функцию один раз вручную перед развертыванием.
// Она запрашивает OAuth-доступ и проверяет все таблицы, ничего не записывая.
function testAuth() {
  Object.keys(TARGETS).forEach(function (key) {
    const target = TARGETS[key];
    const spreadsheet = SpreadsheetApp.openById(target.spreadsheetId);
    const sheet = spreadsheet.getSheetByName(target.sheetName);
    if (!sheet) throw new Error("Target sheet not found for " + key + ": " + target.sheetName);
  });
  console.log("Access to all target spreadsheets is available.");
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || "{}");
    const expectedToken = PropertiesService.getScriptProperties().getProperty("API_TOKEN");
    if (!expectedToken || payload.token !== expectedToken) return response({ ok: false, error: "unauthorized" });

    const target = TARGETS[payload.target];
    if (!target || !Array.isArray(payload.values) || payload.values.length !== target.valueCount) {
      return response({ ok: false, error: "invalid_payload" });
    }

    const lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return response({ ok: false, error: "busy" });

    try {
      const spreadsheet = SpreadsheetApp.openById(target.spreadsheetId);
      const sheet = spreadsheet.getSheetByName(target.sheetName);
      if (!sheet) throw new Error("Target sheet not found: " + target.sheetName);
      sheet.appendRow([new Date()].concat(payload.values.map(safeCell)));
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }

    return response({ ok: true });
  } catch (error) {
    console.error(error);
    return response({ ok: false, error: "internal_error" });
  }
}
