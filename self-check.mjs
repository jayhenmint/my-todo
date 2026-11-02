import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [html, css, js] = await Promise.all([
  readFile('index.html', 'utf8'),
  readFile('style.css', 'utf8'),
  readFile('app.js', 'utf8'),
]);

assert.match(html, /<form[^>]*id="todo-form"/);
assert.match(html, /<input[^>]*id="todo-input"[^>]*required/);
assert.match(html, /<input[^>]*id="search-input"[^>]*type="search"/);
assert.match(html, /<ul[^>]*id="todo-list"/);
assert.match(html, /app\.js/);
assert.match(html, /style\.css/);
assert.match(js, /localStorage\.getItem/);
assert.match(js, /localStorage\.setItem/);
assert.match(js, /toLowerCase\(\)\.includes\(query\)/);
assert.match(js, /search\.addEventListener\('input', render\)/);
assert.match(js, /type = 'checkbox'/);
assert.match(js, /Delete/);
assert.ok(css.length > 0);
console.log('Static self-check passed.');
