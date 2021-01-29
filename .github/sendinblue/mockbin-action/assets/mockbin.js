const fs = require('fs');
const path = require('path');

const [, command] = process.argv;
const commandName = path.basename(command);
const mockbinPath = process.env.MOCKBIN_PATH ? process.env.MOCKBIN_PATH : './';
const resultsOutputFile = `${mockbinPath}/${commandName}.mockbinout`;

// Generate output
const timestamp = process.hrtime.bigint();

const result = {
  ts: `${timestamp}`,
  cmd: commandName,
  args: process.argv.slice(2),
  stdin: null,
};

// Read piped data
// if (!process.stdin.isTTY) {
//   const stdinBuffer = fs.readFileSync(0);
//   result['stdin'] = stdinBuffer.toString();
// }

// Append result
let results = [];
try {
  results = JSON.parse(fs.readFileSync(resultsOutputFile, 'utf8'));
} catch (e) {
}
results.push(result);

// Write to output file
fs.writeFileSync(resultsOutputFile, JSON.stringify(results));
