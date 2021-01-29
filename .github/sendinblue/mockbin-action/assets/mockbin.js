const fs = require('fs');
const path = require('path');

const mockbinPath = process.env.MOCKBINPATH ? process.env.MOCKBINPATH : './';
const resultsOutputFile = `${mockbinPath}/mockbin.out`;

// Generate output
const timestamp = process.hrtime.bigint();
const [, command] = process.argv;
const commandName = path.baseName(command);

const result = {
  "ts": timestamp,
  "cmd": commandName,
  "args": process.argv.slice(2),
};

// Append result
let results = [];
try {
  results = JSON.parse(fs.readFileSync(resultsOutputFile, 'utf8'));
} catch (e) {

}
results.push(result);

// Write file
fs.writeFileSync(resultsOutputFile, JSON.stringify(results));
