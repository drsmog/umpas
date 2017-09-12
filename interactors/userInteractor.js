const Promise = require('bluebird');
const _ = require('lodash');
const random = require('randomstring');
const projectInteractor = require('./projectInteractor');

exports.getFullUsersList = function(projectId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(umService) {

      return umService.getAllUsers()
        .then(function(users) {
          return Promise.map(users, function(user) {
            return Promise.join(
              umService.getUserById(user.id),
              umService.getUserDevices(user.userName),
              function(fullUser, devices) {
                fullUser.devices = devices;

                return fullUser;
              }
            );
          });
        });

    });
};

exports.deleteUser = function(projectId, userId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.deleteUser(userId);
    });
};

exports.changeUserName = function(projectId, userId, newUsername) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.changeUsername(userId, newUsername);
    });
};

exports.changeUserInfo = function(projectId, userId, info) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.changeUserInfo(userId, info);
    });
};

exports.assignRole = function(projectId, userId, role) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.assignUserRole(userId, role);
    });
};

exports.unassignRole = function(projectId, userId, role) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.removeUserRole(userId, role);
    });
};

exports.activate = function(projectId, userId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.activateUser(userId);
    });
};

exports.deactivate = function(projectId, userId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.deactivateUser(userId);
    });
};

exports.updateFullUser = function(projectId, userId, user) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {

      const info = _.pick(user, [
        'firstName',
        'lastName',
        'email',
        'phone',
        'address',
        'additionalInfo'
      ]);

      return service.getUserById(userId)
        .then(function(oldUser) {
          const infoPromise = service.changeUserInfo(userId, info);

          const metadataPromise = service.updateMetadata(user.metaData);

          const activationPromise = updateStatus(service, userId, oldUser
            .isActivated, user.isActivated);

          const rolesPromise = updateRoles(service, userId, oldUser.roles,
            user.roles);

          return Promise.all([
            infoPromise,
            metadataPromise,
            activationPromise,
            rolesPromise
          ]);

        });

    });
};

exports.registerInactiveUser = function(projectId, user) {
  return projectInteractor.getProjectService(projectId)
    .then(function(service) {
      if (!user.password) user.password = random.generate({
        length: 7,
        charset: 'numeric'
      });

      return service.signup(user)
        .then(function() {
          return user.password;
        });
    });
};

exports.resetUserPassword = function(projectId, userId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function(service) {
      return service.resetUserPassword(userId)
        .then(function(result) {
          return result.password;
        });
    });
};

function computeRoleChanges(oldRoles, newRoles) {
  let rolesToAssign = _.difference(newRoles, oldRoles);

  let rolesToUnassign = _.difference(oldRoles, newRoles);

  return {
    rolesToAssign: rolesToAssign,
    rolesToUnassign: rolesToUnassign
  };
}

function updateStatus(service, userId, oldStatus, newStatus) {
  if (oldStatus === newStatus) {
    return Promise.resolve();
  }

  if (newStatus === true) {
    return service.activateUser(userId);
  }

  return service.deactivateUser(userId);
}

function updateRoles(service, userId, oldRoles, newRoles) {
  const roleChanges = computeRoleChanges(oldRoles, newRoles);

  const assignsPromise = Promise.map(roleChanges.rolesToAssign, function(role) {
    return service.assignUserRole(userId, role);
  });

  const unassignsPromise = Promise.map(roleChanges.rolesToUnassign, function(
    role) {
    return service.removeUserRole(userId, role);
  });

  return Promise.all([
    assignsPromise,
    unassignsPromise
  ]);
}

function updateDevices(service, userName, oldDevices, newDevices) {

}
