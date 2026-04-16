/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const jsonPath = path.join(dir, 'notes.json');
const outPath = path.join(dir, 'notes-catalog.js');

const json = fs.readFileSync(jsonPath, 'utf8');
JSON.parse(json);
const banner =
  '/** Каталог конспектов. Собран из notes.json — после правок JSON: npm run build-notes-catalog */\n';
fs.writeFileSync(outPath, banner + 'window.__NOTES_CATALOG__ = ' + json.trim() + ';\n', 'utf8');
console.log('Wrote notes-catalog.js from notes.json');
