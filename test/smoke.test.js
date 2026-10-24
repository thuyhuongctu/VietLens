const fs = require('fs');
const assert = require('assert');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');
const data = fs.readFileSync('sample-data.js', 'utf8');
const readme = fs.readFileSync('README.md', 'utf8');

[
  'id="overview"',
  'id="signals"',
  'id="forecast"',
  'id="audit"',
  'id="vnMap"',
  'id="signalList"',
  'id="scenarioResults"',
  'id="provenanceTable"',
  'MVP · SAMPLE DATA',
  './sample-data.js',
  './app.js',
  './styles.css'
].forEach((token) => assert(html.includes(token), `Missing HTML token: ${token}`));

assert(css.includes('@media (max-width: 620px)'), 'Missing mobile breakpoint');
assert(css.includes('prefers-reduced-motion'), 'Missing reduced-motion support');
assert(app.includes('baselineForecast'), 'Missing forecast engine');
assert(app.includes('runScenario'), 'Missing scenario engine');
assert(app.includes('exportReport'), 'Missing report export');
assert(app.includes('Not financial, legal, medical, emergency or public-policy advice'), 'Missing export limitation');
assert(data.includes('VIETLENS_SAMPLE'), 'Missing sample dataset');
assert(data.includes("datasetStatus: 'sample-proxy'"), 'Missing sample/proxy status');
assert(data.includes('provenance'), 'Missing provenance metadata');
assert(readme.includes('separate repository, database, API configuration and provenance ledger'), 'Missing product separation boundary');
assert(!html.includes('service_role'), 'VietLens preview must not expose service role');
assert(!app.includes('service_role'), 'VietLens runtime must not use service role');

console.log('VietLens clean preview static smoke tests passed.');
