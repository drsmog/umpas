const config = require('config');

exports.passwordHash = function (password) {
  return crypto.createHmac('sha256', config.get('umpackServer.umpack.passwordHashSecret'))
    .update(password)
    .digest('hex');
};
