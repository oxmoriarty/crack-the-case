import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const clientDir = path.resolve(rootDir, 'dist/client');

const BACKEND_PORT = 3001;
const FRONTEND_PORT = 3000;

// 1. Start the Devvit serverless backend on internal port 3001
process.env.WEBBIT_PORT = String(BACKEND_PORT);
await import('../dist/server/index.cjs');

// MIME types lookup
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

// 2. Start the HTTP proxy & static file server on port 3000
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${FRONTEND_PORT}`);
  let pathname = parsedUrl.pathname;

  // Proxy /api/* to backend with required Devvit context headers
  if (pathname.startsWith('/api/')) {
    const proxyHeaders = {
      ...req.headers,
      host: `localhost:${BACKEND_PORT}`,
      'devvit-subreddit': 't5_kzzwlp',
      'devvit-user': 't2_frephtv0',
      'devvit-app-name': 'crack-the-case',
    };

    const proxyReq = http.request(
      {
        hostname: 'localhost',
        port: BACKEND_PORT,
        path: req.url,
        method: req.method,
        headers: proxyHeaders,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
      }
    );

    proxyReq.on('error', (err) => {
      console.error('API Proxy error:', err);
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('Bad Gateway');
    });

    req.pipe(proxyReq);
    return;
  }

  // Map route to client file
  if (pathname === '/' || pathname === '/splash' || pathname === '/splash.html') {
    pathname = '/splash.html';
  } else if (pathname === '/game' || pathname === '/game.html') {
    pathname = '/game.html';
  }

  const filePath = path.join(clientDir, pathname);

  // Security: prevent path traversal outside clientDir
  if (!filePath.startsWith(clientDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`Not Found: ${pathname}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(FRONTEND_PORT, () => {
  console.log('========================================================');
  console.log(`🔎 CRACK THE CASE — LOCAL DEV & UI PREVIEW SERVER READY`);
  console.log(`👉 Splash Screen:  http://localhost:${FRONTEND_PORT}/`);
  console.log(`👉 Game View:      http://localhost:${FRONTEND_PORT}/game.html`);
  console.log('========================================================');
});
