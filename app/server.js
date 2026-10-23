// 練習用アプリの入り口。routes に { method, path, handler } を足していく
const http = require('http');
const { requireLogin } = require('./lib/auth');

const routes = [
  { method: 'GET', path: /^\/health$/, handler: (req, res) => send(res, 200, { ok: true }) },
  { method: 'GET', path: /^\/me$/, handler: requireLogin((req, res, params, user) => send(res, 200, { name: user.name })) },
];

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  for (const r of routes) {
    const m = r.method === req.method && url.pathname.match(r.path);
    if (m) return r.handler(req, res, m.slice(1));
  }
  send(res, 404, { error: 'not found' });
}

if (require.main === module) {
  http.createServer(handle).listen(3000, () => console.log('http://localhost:3000'));
}

module.exports = { handle, routes, send };
