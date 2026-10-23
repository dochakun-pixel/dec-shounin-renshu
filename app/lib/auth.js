// 共通の部品: ログイン。画面や API は必ず requireLogin を通す
// 練習用なので、ログイン済みの人をトークンで決め打ちしている
const sessions = new Map([
  ['token-tanaka', { id: 'u1', name: '田中', role: 'staff' }],
  ['token-suzuki', { id: 'u2', name: '鈴木', role: 'staff' }],
  ['token-admin', { id: 'u9', name: '管理者', role: 'admin' }],
]);

function currentUser(req) {
  const token = String(req.headers['authorization'] || '').replace(/^Bearer\s+/, '');
  return sessions.get(token) || null;
}

// handler(req, res, params, user) を、ログインしている人だけに通す
function requireLogin(handler) {
  return (req, res, params) => {
    const user = currentUser(req);
    if (!user) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'login required' }));
    }
    return handler(req, res, params, user);
  };
}

module.exports = { currentUser, requireLogin };
