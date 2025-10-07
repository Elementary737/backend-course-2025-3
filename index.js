const fs = require('fs');
const { program } = require('commander');

program
  .requiredOption('-i, --input <file>', 'Input JSON file')
  .option('-o, --output <file>', 'Output file')
  .option('-d, --display', 'Display output in console');

program.parse(process.argv);

const options = program.opts();

// 1️⃣ Перевірка наявності обов’язкового параметра
if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

// 2️⃣ Перевірка, чи існує файл
if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// 3️⃣ Читаємо JSON
const data = fs.readFileSync(options.input, 'utf8');
const jsonData = JSON.parse(data);

// 4️⃣ Вивід даних (поки просто тестовий)
if (options.display) {
  console.log(jsonData);
}

if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(jsonData, null, 2));
  console.log(`Result written to ${options.output}`);
}
