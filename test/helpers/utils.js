const config = require('config');
const crypto = require('crypto');

exports.passwordHash = function (password) {
  return crypto.createHmac('sha256', config.get('umpackServer.umpack.passwordHashSecret'))
    .update(password)
    .digest('hex');
};
