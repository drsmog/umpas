const mongoose = require('mongoose');
const config = require('config');

const usersCollection = 'users';
const rolesCollection = 'roleactions';
const password = '123456';

const actionId = new mongoose.ObjectID();

exports.insertRootUser = function () {
  return mongoose.connection.db.collection(usersCollection)
    .insert({
      userName: 'root',
      password: password,
      isActivated: true,
      roles: ['admin']
    });
};

exports.truncateUsersCollection = function () {
  return mongoose.connection.db.collection(usersCollection).remove();
};

exports.insertAdminRole = function () {
  return mongoose.connection.db.collection(rolesCollection)
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
  return mongoose.connection.db.collection(rolesCollection).remove();
};
