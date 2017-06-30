const Promise = require('bluebird');
const _ = require('lodash');
const projectInteractor = require('./projectInteractor');

exports.getActions = function(projectId, role) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.getFullRole(role);
    })
    .then(function(roleObject) {
      return roleObject.actions;
    });
};

exports.permitAction = function(projectId, role, action) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.permitActionToRole(role, action);
    })
    .then(function(result) {
      action.id = result.actionId;

      action.verbGet = getVerbPermission(action.verbGet);
      action.verbPost = getVerbPermission(action.verbPost);
      action.verbPut = getVerbPermission(action.verbPut);
      action.verbDelete = getVerbPermission(action.verbDelete);

      return action;
    });
};

function getVerbPermission(verbBoolean) {
  if (verbBoolean == null || verbBoolean == undefined) {
    return false;
  }

  return verbBoolean;
}

exports.editAction = function(projectId, role, actionId, action) {
  action.id = actionId;

  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.editRoleAction(role, action);
    });
};

exports.removePermittedAction = function(projectId, role, actionId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.removePermittedActionFromRole(role, actionId);
    });
};
