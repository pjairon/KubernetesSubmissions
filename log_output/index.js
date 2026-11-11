const { randomUUID } = require('crypto');
const http = require('http');

const randomString = randomUUID();
const port = process.env.PORT || 3000;

const status = () => `${new Date().toISOString()}: ${randomString}`;

const printString = () => {
  console.log(status());
};

printString();
setInterval(printString, 5000);

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${status()}\n`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found\n');
  }
});

server.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
