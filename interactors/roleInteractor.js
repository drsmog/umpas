const Promise = require('bluebird');
const _ = require('lodash');
const projectInteractor = require('./projectInteractor');

exports.getFullRoles = function(projectId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return Promise.map(service.getRoles(), function(role) {
        return service.getFullRole(role);
      });
    });
};

exports.deleteRole = function(projectId, role) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.deleteRole(role);
    });
};

exports.createRoleWithActions = function(projectId, roleObject) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.createRole(roleObject.name)
        .then(function() {
          return Promise.map(roleObject.actions, function(action) {
            return service.permitActionToRole(roleObject.name, action)
              .then(function(result) {
                return Object.assign({}, action, result.actionId);
              });
          });
        });
    })
    .then(function(actions) {
      roleObject.actions = actions;

      return roleObject;
    });
};
