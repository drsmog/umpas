const config = require('config');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const connectedState = 1;

exports.passwordHash = function(password) {
  return crypto.createHmac('sha256', config.get(
      'umpackServer.umpack.passwordHashSecret'))
    .update(password)
    .digest('hex');
};

exports.dropCollection = function(collectionName, connection) {
  if (!connection) connection = mongoose.connection;

  return new Promise(function(resolve, reject) {

    if (connection._readyState !== connectedState) {

      connection.on('open', function() {
        connection.db.dropCollection(collectionName)
          .then(resolve)
          .catch(reject);
      });

    } else {
      connection.db.dropCollection(collectionName)
        .then(resolve)
        .catch(reject);
    }

  });
};
