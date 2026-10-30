const { randomUUID } = require('crypto');

const randomString = randomUUID();

const printString = () => {
  console.log(`${new Date().toISOString()}: ${randomString}`);
};

printString();
setInterval(printString, 5000);
