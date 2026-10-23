// 共通の部品: 権限。データを返す前に can() で確かめる
function can(user, action, resource) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (action === 'read:order') return resource && resource.ownerId === user.id;
  return false;
}

module.exports = { can };
