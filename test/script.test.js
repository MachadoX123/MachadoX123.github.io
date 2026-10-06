const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const scriptPath = path.join(__dirname, '..', 'script.js');
const scriptSource = fs.readFileSync(scriptPath, 'utf8');

test('updates the footer with the current year', () => {
  const footerYear = { textContent: '' };
  let selectedSelector;
  const context = {
    document: {
      querySelector(selector) {
        selectedSelector = selector;
        return footerYear;
      },
    },
    Date: class extends Date {
      getFullYear() {
        return 2026;
      }
    },
  };

  vm.runInNewContext(scriptSource, context);

  assert.equal(selectedSelector, '#year');
  assert.equal(footerYear.textContent, '2026');
});

test('does not fail when the page has no footer year element', () => {
  const context = { document: { querySelector: () => null } };

  assert.doesNotThrow(() => vm.runInNewContext(scriptSource, context));
});
