import fs from 'node:fs/promises';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const outDir = '/Users/apple/Desktop/programming/job/truck service/outputs/quote-factory-feature4-6-ui-20261105';
const workbook = Workbook.create();

const cases = [
  ['4 Customer list','F4-01','/broker/customers → wait for settled list → open a customer row','List shows customer/contact, Booked and Quoted activity/last dates, Credit and Rep; selecting a row opens that customer.','Clone list shows Customer, Primary contact, Booked/last, Quoted/last, Credit and Rep; Add, filters, login link and export controls are visible. Opening Demo Retail Inc navigates to its detail route.','Pass — fields and row navigation','No','Compared with original customer list. Record count, names and values are dummy/account data and excluded.'],
  ['4 Customer list','F4-02','View shipment filters → enter unmatched dummy text → See customers → Reset filters','Unmatched search settles to an empty result; Reset restores the unfiltered list.','Clone settles to 0 of 5 with No matches found; Reset restores 5 of 5 and clears the query.','Pass','No','Search and reset interaction confirmed in clone; guide §12.1 documents original empty-search behavior.'],
  ['4 Customer list','F4-03','View shipment filters → select a Rep/team option → See customers → Reset filters','A selected available Rep/team filter applies; Reset clears it.','Clone Dallas Team selection applies and shows 0 of 5, then Reset restores 5 of 5. Original had no matching Dallas Team option in this account.','Partial — option unavailable in original','No','Do not report differing option availability or row counts as a bug; account data differs.'],
  ['4 Customer list','F4-04','/broker/customers → click Customer header twice','Customer header sorts and toggles direction.','Original and clone Customer header both toggle sorting.','Pass','No','Specific row order and names excluded.'],
  ['4 Customer list','F4-05','Click Primary contact, Booked, Booked last, Quoted, Quoted last, Credit and Rep headers','Each header acts as a sort control and changes the active sort/order.','Original and clone expose each as a button; click actions changed sort indicator and/or displayed row order for the tested fields.','Pass — sort controls respond','No','Different datasets/orders are excluded. UI interactions compared in both apps.'],
  ['5 Customer creation','F5-01','/broker/customers → Add a new customer → inspect blank form → close','Customer name search and add-as-new action are available.','Clone blank dialog shows Customer name search and Add as a new customer action.','Pass — UI presence','No','No customer created.'],
  ['5 Customer creation','F5-02','Add a new customer → enter BUCHANAN → wait for suggestions','Show a matching existing customer suggestion plus a separate add-as-new option.','Clone showed only Add BUCHANAN as a new customer. Original showed Did you mean? with BUCHANAN COMPANY, INC and separate add-as-new.','Fail','BUG-4-01','Original and clone compared; guide §12.2 documents the matching suggestion. No create submitted.'],
  ['5 Customer identity','F5-03','/broker/customer/{id} → Edit customer details → General','Customer name, Vendor number, Phone, Website and About are available with Done and Close.','Original and clone General editor show all five fields and Done/Close controls.','Pass — fields/actions present','No','No values changed.'],
  ['5 Customer identity','F5-04','Customer detail → click + vendor number, + website, + phone and + description','Each shortcut opens the customer identity entry flow.','Clone vendor number, website and description shortcuts open General. Original vendor number, website, phone and description shortcuts open the same General editor.','Pass — shortcut flows','No','No values changed.'],
  ['5 Customer identity','F5-05','Customer profile → inspect Overview, Shipments, Quotes, Addresses, Invoices, Payments; click a tab','All six sections are selectable and open the corresponding customer section.','Both apps expose the six tabs. Clone Shipments changes the selected tab and navigates to /shipments.','Pass — visible and clone navigation verified','No','No data comparison.'],
  ['5 Customer identity','F5-06','Customer detail → click + logo','Logo control opens a file-source/upload picker.','Original opens Filestack with My Device, Link (URL), Take Photo, Instagram, Facebook, Google Drive and Select Files. Clone + logo click leaves the page unchanged.','Fail','BUG-5-01','Original/clone UI compared. No source selected and no upload submitted.'],
  ['6 Contacts','F6-01','Customer Overview → View all customer contacts → select a contact','Contact list/detail view opens and permits selecting a contact.','Original and clone open contact views with selectable contacts and contact details.','Pass — UI presence','No','Primary indicators and record counts are sample data and excluded.'],
  ['6 Contacts','F6-02','View all customer contacts → Add new contact → inspect form → Cancel','First name, Last name, Title, Phone/email/URL details, Create and Cancel are available.','Original and clone provide name, title, one Phone/email/URL detail entry, Create and Cancel. Control arrangement differs, purpose is equivalent.','Pass — fields/actions present','No','No contact created; form canceled. Requiredness/type detection/persistence not tested.'],
  ['6 Contacts','F6-03','Select existing contact → Edit contact → inspect → Cancel','Edit form provides first/last name, title and contact-detail fields with Update and Cancel.','Original and clone expose name, title and contact-detail edit fields plus Update and Cancel.','Pass — fields/actions present','No','No values changed.'],
  ['6 Contacts','F6-04','Select contact → inspect communication, note and management controls','Applicable mail/phone links, copy, note, edit/delete and reorder controls are available.','Original and clone show available contact actions, communication links/copy, note, edit/delete and reorder controls.','Pass — visible controls','No','No communication sent and no contact changed/deleted/reordered.'],
  ['6 Contacts','F6-05','View all customer contacts → select a contact → inspect External references','Contact detail shows External references and Add external reference.','Original contact view shows External references and + Add external reference. Clone contact detail has no such section or action.','Fail','BUG-6-01','Original and clone compared; guide §12.3 documents the entry point. No reference added.'],
];

const bugs = [
  ['BUG-4-01','5 Customer creation','Matching existing customer is not suggested','/broker/customers → Add a new customer → Customer name','Enter BUCHANAN and wait for suggestions.','Clone shows only “Add BUCHANAN as a new customer”; original shows “Did you mean?” with BUCHANAN COMPANY, INC plus add-as-new.','Show the matching existing customer suggestion and retain the separate add-as-new option.','Original/clone UI compared; guide §12.2. No create submitted.'],
  ['BUG-5-01','5 Customer identity','Logo control does not open upload picker','/broker/customer/{customer-id} → Overview → + logo','Click + logo.','Clone click leaves customer page unchanged. Original opens Filestack source picker.','Open the logo file-source/upload picker as in the original app.','Original/clone UI compared on customer detail. No source selected/uploaded.'],
  ['BUG-6-01','6 Contacts','Contact external-reference entry point is missing','/broker/customer/{customer-id} → Overview → View all customer contacts → select a contact','Open an existing contact and inspect its actions.','Clone shows contact details, communication links/copy and Add note, but no External references section or Add external reference.','Show the contact-specific External references section and Add external reference entry point described in Guide §12.3.','Original and clone contact views compared. No reference added.'],
];

const gaps = [
  ['4 Customer list','No matching Dallas Team option appeared in original account, so the same Rep filter selection cannot be applied side by side.','/broker/customers → View shipment filters','Use a Rep/team option available in both environments if one is provided; ignore counts/data values.','Open — account options differ; not a bug'],
  ['4 Customer list','Filter results for a shared valid Rep/team value were not compared.','/broker/customers → View shipment filters','Confirm the filter applies and Reset clears it in both apps using a shared available option.','Open — shared option unavailable'],
  ['5 Customer creation; 6 Contacts','Validation and saved create/update/delete/reorder behavior were not submitted; this pass is UI-only and backend is unfinished.','Customer creation and contact forms/actions','Revisit after backend is ready and UI-only scope is expanded.','Deferred — not a current UI bug'],
];

function addTableSheet(name, title, subtitle, headers, rows, widths) {
  const sheet = workbook.worksheets.add(name);
  sheet.getRange(`A1:${String.fromCharCode(64 + headers.length)}1`).merge();
  sheet.getRange(`A2:${String.fromCharCode(64 + headers.length)}2`).merge();
  sheet.getRange('A1').values = [[title]];
  sheet.getRange('A2').values = [[subtitle]];
  sheet.getRange(`A4:${String.fromCharCode(64 + headers.length)}${4 + rows.length}`).values = [headers, ...rows];
  sheet.getRange(`A1:${String.fromCharCode(64 + headers.length)}1`).format = { fill: '#163A5F', font: { name: 'Arial', size: 15, bold: true, color: '#FFFFFF' } };
  sheet.getRange(`A2:${String.fromCharCode(64 + headers.length)}2`).format = { fill: '#EAF1F8', font: { name: 'Arial', size: 10, color: '#23384D' }, wrapText: true };
  sheet.getRange(`A4:${String.fromCharCode(64 + headers.length)}4`).format = { fill: '#0F766E', font: { name: 'Arial', bold: true, color: '#FFFFFF' }, wrapText: true };
  const end = 4 + rows.length;
  sheet.getRange(`A5:${String.fromCharCode(64 + headers.length)}${end}`).format = { font: { name: 'Arial', size: 10, color: '#1F2937' }, wrapText: true, verticalAlignment: 'top' };
  sheet.getRange(`A1:${String.fromCharCode(64 + headers.length)}1`).format.rowHeight = 30;
  sheet.getRange(`A2:${String.fromCharCode(64 + headers.length)}2`).format.rowHeight = 56;
  sheet.getRange(`A4:${String.fromCharCode(64 + headers.length)}4`).format.rowHeight = 34;
  sheet.getRange(`A5:${String.fromCharCode(64 + headers.length)}${end}`).format.rowHeight = 76;
  widths.forEach((width, i) => {
    const col = String.fromCharCode(65 + i);
    sheet.getRange(`${col}1:${col}${end}`).format.columnWidth = width;
  });
  sheet.freezePanes.freezeRows(4);
  return sheet;
}

addTableSheet('Test Cases','Quote Factory UI Verification — Features 4–6','Source of truth: Quote Factory Quote Workflow Guide, §§12.1–12.3. UI-only comparison of original and clone. Ignore layout/order and dummy-data differences; only missing fields/capabilities, failed operations, or contradictory results are bugs.',['Feature','Test ID','Route / steps','Expected from guide / original','Clone observed','Result','Bug ID','Evidence / notes'],cases,[22,12,56,62,70,30,16,68]);
addTableSheet('Bugs','Confirmed UI bugs — Features 4–6','Only verified functional mismatches are listed. Layout, ordering and dummy-data differences are excluded.',['Bug ID','Feature','Title','Route / location','Steps','Actual','Expected','Evidence'],bugs,[14,24,44,58,42,66,62,58]);
addTableSheet('Reference Gaps','Open checks and scope limits','These are not confirmed bugs. They require shared account data or backend behavior outside this UI-only pass.',['Feature','Open question / limit','Route / location','Next verification','Status'],gaps,[25,64,56,66,34]);

workbook.recalculate();
for (const [sheetName, range] of [['Test Cases','A1:H20'],['Bugs','A1:H8'],['Reference Gaps','A1:E8']]) {
  const result = await workbook.inspect({ kind: 'table', sheetId: sheetName, range, include: 'values', tableMaxRows: 20, tableMaxCols: 10, maxChars: 12000 });
  console.log(`INSPECT ${sheetName}\n${result.ndjson}`);
}
const preview = await workbook.render({ sheetName: 'Test Cases', range: 'A1:H9', scale: 1, format: 'png' });
await fs.writeFile('/tmp/quote-factory-feature46-ui/preview.png', new Uint8Array(await preview.arrayBuffer()));
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outDir}/quote-factory-features-4-6-ui.xlsx`);
console.log(`SAVED ${outDir}/quote-factory-features-4-6-ui.xlsx`);
