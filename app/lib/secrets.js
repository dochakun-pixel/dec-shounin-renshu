// 共通の部品: 秘密情報。API キーなどはコードに書かず、ここから環境変数を読む
function getSecret(name) {
  const value = process.env[name];
  if (!value) throw new Error(`秘密情報 ${name} が設定されていません。管理者に設定を依頼してください`);
  return value;
}

module.exports = { getSecret };
