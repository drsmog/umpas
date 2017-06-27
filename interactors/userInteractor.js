const Promise = require('bluebird');
const projectInteractor = require('./projectInteractor');

exports.getFullUsersList = function(projectId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(umService) {

      return umService.getAllUsers()
        .then(function(users) {
          return Promise.map(users, function(user) {
            return umService.getUserById(user.id);
          });
        });

    });
};

exports.deleteUser = function (projectId, userId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function (service) {
      return service.deleteUser(projectId);
    });
};

exports.changeUserInfo = function (projectId, userId, info) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function (service) {
      return service.changeUserInfo(userId, info);
    });
};

exports.assignRole = function (projectId, userId, role) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function (service) {
      return service.assignUserRole(userId, role);
    });
};

exports.unassignRole = function (projectId, userId, role) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function (service) {
      return service.removeUserRole(userId, role);
    });
};

exports.activate = function (projectId, userId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function (service) {
      return service.activateUser(userId);
    });
};

exports.deactivate = function (projectId, userId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function (service) {
      return service.deactivateUser(userId);
    });
};
