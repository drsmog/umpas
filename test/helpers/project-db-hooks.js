const mongoose = require('mongoose');
const config = require('config');

const projectsCollection = 'projects';
const rootUser = 'root';
const password = '123456';

exports.truncateProjectsCollection = function () {
  return mongoose.connection.db.collection(projectsCollection).remove();
};

exports.insertTestProject = function () {
  return mongoose.connection.db.collection(projectsCollection)
    .insert({
      name: 'test project',
      url: 'localhost:' + config.get('umpackServer.port'),
      username: rootUser,
      password: password,
      umBaseUrl: '/um'
    });
};

exports.getTestProject = function () {
  return mongoose.connection.db.collection(projectsCollection).findOne({name: 'test project'});
};
