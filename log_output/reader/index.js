const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const dir = process.env.FILES_DIR || '/usr/src/app/files';
const pingsDir = process.env.PINGS_DIR || '/usr/src/app/pings';
const logFile = path.join(dir, 'log.txt');
const pingsFile = path.join(pingsDir, 'pingpong.txt');

const readPings = () => {
  try {
    return parseInt(fs.readFileSync(pingsFile, 'utf8'), 10) || 0;
  } catch (err) {
    return 0;
  }
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(logFile, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('No log file yet\n');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`${data}Ping / Pongs: ${readPings()}\n`);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found\n');
  }
});

server.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
