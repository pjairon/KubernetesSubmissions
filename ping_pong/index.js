const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const dir = process.env.FILES_DIR || '/usr/src/app/files';
const file = path.join(dir, 'pingpong.txt');

fs.mkdirSync(dir, { recursive: true });

let counter = 0;
try {
  counter = parseInt(fs.readFileSync(file, 'utf8'), 10) || 0;
} catch (err) {
  counter = 0;
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/pingpong') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`pong ${counter}\n`);
    counter += 1;
    fs.writeFileSync(file, `${counter}\n`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found\n');
  }
});

server.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
