const Promise = require('bluebird');
const _ = require('lodash');
const projectInteractor = require('./projectInteractor');

exports.getRoles = function(projectId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.getRoles();
    });
};

exports.deleteRole = function(projectId, role) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.deleteRole(role);
    });
};

exports.createRole = function(projectId, roleObject) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.createRole(roleObject.name, roleObject.description);
    })
    .then(function () {
      return roleObject;
    });
};

exports.editRole = function (projectId, roleName, roleObject) {
  const role = {
    name: roleObject.name,
    description: roleObject.description
  };

  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function (service) {
      return service.changeRole(role.name, roleName, role);
    })
    .then(function () {
      return roleObject;
    });
};
