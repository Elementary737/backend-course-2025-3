const fs = require('fs');
const { program } = require('commander');

program
  .requiredOption('-i, --input <file>', 'Input JSON file')
  .option('-o, --output <file>', 'Output file')
  .option('-d, --display', 'Display output in console')
  .option('-c, --cylinders', 'Display number of cylinders')
  .option('-m, --mpg <number>', 'Filter cars with mpg less than specified value');

program.parse(process.argv);
const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

let data;
try {
  data = fs.readFileSync(options.input, 'utf8');
} catch (err) {
  console.error("Error reading input file:", err.message);
  process.exit(1);
}

let jsonData;
try {
  jsonData = JSON.parse(data);
} catch (err) {
  console.error("Invalid JSON!");
  process.exit(1);
}

let filteredData = jsonData;
if (options.mpg) {
  const mpgLimit = Number(options.mpg);
  filteredData = filteredData.filter(car => car.mpg < mpgLimit);
}

const outputLines = filteredData.map(car => {
  let line = car.model;
  if (options.cylinders) {
    line += ` ${car.cyl}`;
  }
  line += ` ${car.mpg}`;
  return line;
});

if (options.display) {
  outputLines.forEach(line => console.log(line));
}

if (options.output) {
  fs.writeFileSync(options.output, outputLines.join('\n'));
  console.log(`Result written to ${options.output}`);
}

