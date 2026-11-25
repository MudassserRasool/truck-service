import fs from 'node:fs/promises';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const out = '/Users/apple/.codex/visualizations/2026/11/13/01a1d490-e5f8-7662-b3d8-94082aa8a12e/outputs/01a1d490-e5f8-7662-b3d8-94082aa8a12e/new-testing-findings.xlsx';
const workbook = Workbook.create();
const sheet = workbook.worksheets.add('New Findings');

sheet.getRange('A1:I2').values = [
  ['ID', 'Area', 'Type', 'Problem', 'Quote Factory (production)', 'TMS staging', 'Status', 'Tested', 'Staging evidence URL'],
  ['ACC-07', 'Carrier bills', 'Unexpected', 'Staging adds an Accounting instructions editor to carrier bills.', 'The inspected carrier bill has no Accounting instructions control.', 'The bill shows “+ Accounting instructions”; it opens a text field with Cancel and Save.', 'New — verified', '2026-11-16', 'https://tms-staging.stackupsolutions.co/broker/shipment/cfe2ed79-f09e-58cb-8a96-364851f1621d/bill/469b9838-8fc0-522e-8fd5-642eb1e2c290'],
];
sheet.getRange('A1:I2').format.font = { name: 'Arial', size: 10, color: '#1F1F1F' };
sheet.getRange('A1:I1').format = {
  fill: '#E8EAED',
  font: { name: 'Arial', size: 10, bold: true, color: '#1F1F1F' },
  wrapText: true,
  verticalAlignment: 'center',
};
sheet.getRange('A2:I2').format.wrapText = true;
sheet.getRange('A1:I1').format.rowHeight = 30;
sheet.getRange('A2:I2').format.rowHeight = 86;
for (const [col, width] of Object.entries({ A: 12, B: 18, C: 16, D: 38, E: 38, F: 42, G: 18, H: 15, I: 58 })) {
  sheet.getRange(`${col}:${col}`).format.columnWidth = width;
}
sheet.freezePanes.freezeRows(1);

workbook.recalculate();
const preview = await workbook.render({ sheetName: 'New Findings', range: 'A1:I2', scale: 1, format: 'png' });
await fs.writeFile(out.replace('.xlsx', '.png'), new Uint8Array(await preview.arrayBuffer()));
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(out);
const check = await workbook.inspect({ kind: 'table', range: 'New Findings!A1:I2', include: 'values,formulas', table_max_rows: 3, table_max_cols: 10 });
console.log(JSON.stringify({ output: out, check }));
