// 共通の部品: 注文データの受け渡し。注文データにはここ以外から触らない
// 練習用なので、本番のデータベースの代わりに手元の配列を使う
const orders = [
  { id: '1', ownerId: 'u1', item: '名刺 100枚', amount: 3300 },
  { id: '2', ownerId: 'u2', item: 'チラシ 500枚', amount: 12100 },
  { id: '3', ownerId: 'u1', item: '封筒 200枚', amount: 5500 },
];

function findOrder(id) {
  return orders.find(o => o.id === String(id)) || null;
}

function listOrders() {
  return orders.map(o => ({ ...o }));
}

module.exports = { findOrder, listOrders };
