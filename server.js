const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5777;
const ROOT = process.cwd();

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon'
};

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
    let filePath = path.join(ROOT, urlPath);
    // protect against path traversal
    if (!filePath.startsWith(ROOT)) filePath = path.join(ROOT, 'index.html');

    fs.stat(filePath, (err, stats) => {
      if (err) {
        // fallback to index.html for SPA or send 404 if missing
        const index = path.join(ROOT, 'index.html');
        return fs.readFile(index, (ie, data) => {
          if (ie) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('404 Not Found');
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data);
        });
      }

      if (stats.isDirectory()) filePath = path.join(filePath, 'index.html');

      fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('500 Internal Server Error');
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}/`);
});