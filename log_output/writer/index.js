const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

const dir = process.env.FILES_DIR || '/usr/src/app/files';
const file = path.join(dir, 'log.txt');
const randomString = randomUUID();

fs.mkdirSync(dir, { recursive: true });

const writeLine = () => {
  const line = `${new Date().toISOString()}: ${randomString}`;
  fs.writeFileSync(file, `${line}\n`);
  console.log(line);
};

writeLine();
setInterval(writeLine, 5000);
