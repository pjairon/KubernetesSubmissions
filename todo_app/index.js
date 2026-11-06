const http = require('http');
const port = process.env.PORT || 3000;

const page = `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="utf-8"><title>Todo app</title></head>
  <body>
    <h1>Todo app</h1>
    <p>Hello from Kubernetes!</p>
  </body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(page);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found\n');
  }
});

server.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
