const fs = require('fs');

// Load file
const callFileName = getOption('call-file');
let callResults = JSON.parse(fs.readFileSync(callFileName, 'utf8'));

// Load index in file
const callIndexStr = getOption('call-index');
const callIndex = parseInt(callIndexStr || 0);
const callResult = callResults[callIndex];

// Get and stringify expected output
const expectedArgs = getOption('expected-args');

// Get and stringify expected output
const expectedStdin = getOption('expected-stdin');

// Validate args
if (expectedArgs) {
  const expectedArgsStr = JSON.stringify(JSON.parse(expectedArgs));
  const actualArgs = JSON.stringify(callResult.args);

  assert(expectedArgsStr, actualArgs);
}

// Validate stdin
if (expectedStdin) {
  const actualStdin = callResult.stdin;
  assert(expectedStdin, actualStdin);
}


function getOption(name) {
  const index = process.argv.indexOf(`--${name}`);
  if (index > -1) {
    return process.argv[index + 1];
  }
}

function assert(expected, actual) {
  if (expected !== actual) {
    console.error(`Assertion error!\nExpected: ${expected}\nActual: ${actual}`);
    process.exit(1);
  }
}
