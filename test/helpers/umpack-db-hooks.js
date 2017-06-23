const mongoose = require('mongoose');
const config = require('config');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const ObjectId = require('mongodb').ObjectID;

const usersCollection = 'users';
const rolesCollection = 'roleactions';
const password = '123456';

const actionId = new ObjectId();

const umpackConnection = mongoose.createConnection(config.get('umpackServer.umpack.mongodbConnectionString'));

exports.insertRootUser = function () {
  return umpackConnection.db.collection(usersCollection)
    .insert({
      userName: 'root',
      password: password,
      isActivated: true,
      roles: ['admin']
    });
};

exports.truncateUsersCollection = function () {
  return umpackConnection.db.collection(usersCollection).remove();
};

exports.insertAdminRole = function () {
  return umpackConnection.db.collection(rolesCollection)
    .insert({
      name: 'admin',
      actions: [
        {
          _id: actionId,
          pattern: '/um/*',
          name: 'um',
          verbGet: true,
          verbPost: true,
          verbPut: true,
          verbDelete: true
        }
      ]
    });
};

exports.truncateRolesCollection = function () {
  return umpackConnection.db.collection(rolesCollection).remove();
};

exports.insertUsers = function (users) {
  return Promise.map(users, function (user) {
    return umpackConnection.db.collection(usersCollection).insert(user);
  });
};

exports.insertRoles = function (roles) {
  return Promise.map(roles, function (role) {
    return umpackConnection.db.collection(rolesCollection).insert(role);
  });
};