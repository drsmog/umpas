const Promise = require('bluebird');
const _ = require('lodash');
const projectInteractor = require('./projectInteractor');

exports.getFullRoles = function(projectId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return Promise.map(service.getRoles(), function(roleObject) {
        return service.getFullRole(roleObject.name);
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

exports.updateFullRole = function(projectId, roleName, roleObject) {
  roleObject.name = roleName;

  return getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.getFullRole(roleName)
        .then(function(oldRole) {
          return updateActions(service, oldRole, roleObject);
        })
        .then(function () {
          return service.getFullRole(roleName);
        });
    });
};

function updateActions(service, oldRole, newRole) {
  const actionChanges = computeActionChanges(oldRole.actions,
    newRole.actions);

  let actionsAddPromise = Promise.map(actionChanges.actionsToAdd, function (action) {
    return service.permitActionToRole(newRole.name, action);
  });

  let actionsEditPromise = Promise.map(actionChanges.actionsToEdit, function (action) {
    return service.editRoleAction(newRole.name, action);
  });

  let actionsRemovePromise = Promise.map(actionChanges.actionsToRemove, function (action) {
    return service.removePermittedActionFromRole(newRole.name, action);
  });

  return Promise.all([
    actionsAddPromise,
    actionsEditPromise,
    actionsRemovePromise
  ]);
}

function computeActionChanges(oldActions, newActions) {
  const actionIdPairLambda = action => [action.id, action];

  let oldActionsMap = new Map(oldActions.map(actionIdPairLambda));

  let newActionsMap = new map(newActions.map(actionIdPairLambda));

  let actionsToAdd = computeDifference(newActions, oldActionsMap);

  let actionsToRemove = computeDifference(oldActions, newActionsMap);

  let actionsToEdit = computeActionsToEdit(oldActions, newActionsMap);

  return {
    actionsToAdd: actionsToAdd,
    actionsToEdit: actionsToEdit,
    actionsToRemove: actionsToRemove
  };
}

function computeActionsToEdit(oldActions, newActionsMap) {
  let commonsPairs = oldActions.filter(function(action) {
      return newActionsMap.has(action.id);
    })
    .map(function(action) {
      return [action, newActionsMap.get(action.id)];
    });

  return findDifferencesInPairs(commonsPairs)
    .map(pair => pair[1]);
}

function findDifferencesInPairs(commonsPairs) {
  return commonsPairs.filter(function(pair) {
    return !_.isEqual(pair[0], pair[1]);
  });
}

function computeDifference(actions, secondActionsMap) {
  return actions.filter(function(action) {
    return !secondActionsMap.has(action.id);
  });
}
