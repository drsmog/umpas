const projectRepo = require('../infrastructure/projectsRepository');
const RecordError = require('../exceptions/recordError');
const Promise = require('bluebird');
const UmpackService = require('../infrastructure/umpackService');
const Project = require('../models/project');
const _ = require('lodash');
const roleInteractor = require('./roleInteractor');
const actionInteractor = require('./actionInteractor');
const userInteractor = require('./userInteractor');
const device = require('../device');
const serviceCache = require('../infrastructure/serviceCache');

exports.getList = function() {
  return projectRepo.find({});
};

exports.addProject = function(project) {
  return Promise.try(function() {
      validate(project);

      return projectRepo.save(project);
    })
    .then(function(id) {
      return projectRepo.getById(id);
    });
};

exports.editProjectDetails = function(id, project) {
  return Promise.try(function() {
      validate(project);

      if (!project.id) {
        project.id = id;
      }

      return projectRepo.update(project);
    })
    .then(function() {
      return projectRepo.getById(id);
    });
};

exports.removeProject = function(id) {
  return projectRepo.deleteById(id);
};

exports.getProjectService = function(projectId) {
  const service = serviceCache.getService(projectId);

  if (service) return Promise.resolve(service);

  return projectRepo.getById(projectId)
    .then(function(project) {
      const service = new UmpackService(project);

      serviceCache.saveService(projectId, service);

      return service;
    });
};

exports.getLoggedInProjectService = function(projectId) {
  return exports.getProjectService(projectId)
    .then(function(service) {
      if (service.loggedIn) return service;

      return service.login()
        .then(function() {
          return service;
        });
    });
};

exports.loginProject = function(projectId) {
  return exports.getProjectService(projectId)
    .then(function(service) {
      return service.login();
    });
};

exports.initializeExistingProjectUm = function(projectId) {
  return projectRepo.getById(projectId)
    .then(function(project) {
      const service = new UmpackService(project);

      return service.initializeUm(device.deviceToken)
        .then(function(result) {
          if (result.password) project.initializeUser(result.password);

          return project.save();
        });
    });
};

exports.initializeProjectUm = function(projectObject) {
  return Promise.try(function() {
    validateOnClientUrl(projectObject);

    const project = new Project(projectObject);

    const service = new UmpackService(project);

    return service.initializeUm(device.deviceToken)
      .then(function(result) {
        if (result.password) project.initializeUser(result.password);

        const projectToReturn = _.omit(project.toObject(), ['id', '_id']);

        return projectToReturn;
      });
  });
};

exports.cloneProjectData = function(sourceProjectId, destinationProjectId) {
  return Promise.join(
    exports.cloneProjectUsers(sourceProjectId, destinationProjectId),
    exports.cloneProjectRoles(sourceProjectId, destinationProjectId),
    function(credentials) {
      return credentials;
    }
  );
};

exports.cloneProjectRoles = function(sourceProjectId, destinationProjectId) {
  return Promise.join(
      roleInteractor.getRoles(sourceProjectId),
      roleInteractor.getRoles(destinationProjectId),
      function(sourceRoles, destinationRoles) {
        return _.differenceBy(sourceRoles, destinationRoles, role => role.name);
      }
    )
    .then(function(notIncludedRoles) {
      return Promise.map(notIncludedRoles, function(roleObject) {
        return roleInteractor.createRole(destinationProjectId, roleObject)
          .then(function() {
            return Promise.map(roleObject.actions, function(action) {
              return actionInteractor.permitAction(destinationProjectId, roleObject.name, action);
            });
          });
      });
    });
};

exports.cloneProjectUsers = function(sourceProjectId, destinationProjectId) {
  return Promise.join(
      userInteractor.getFullUsersList(sourceProjectId),
      userInteractor.getFullUsersList(destinationProjectId),
      function(sourceUsers, destinationUsers) {
        return _.differenceWith(
          sourceUsers,
          destinationUsers,
          usersComparator
        );
      }
    )
    .then(function(notIncludedUsers) {
      return Promise.map(notIncludedUsers, function(user) {
        return userInteractor.registerInactiveUser(destinationProjectId, excludePassword(user))
          .then(function(password) {
            return exports.getLoggedInProjectService(destinationProjectId)
              .then(function(service) {
                return service.getUserByUsername(user.userName);
              })
              .then(function(insertedUser) {
                return insertedUser.id;
              })
              .then(function(userId) {
                return userInteractor.updateFullUser(destinationProjectId, userId, user);
              })
              .then(function() {
                return {
                  userName: user.userName,
                  password: password
                };
              });
          });
      });
    });
};

function excludePassword(user) {
  return Object.assign({}, user, {
    password: null
  });
}

function usersComparator(source, dest) {
  if (!source.email && !dest.email) return true;

  const usernamesEquals = source.userName.trim() === dest.userName.trim();

  if (!source.email || !dest.email) return usernamesEquals;

  return usernamesEquals ||
    source.email.trim() === dest.email.trim();
}

function validateOnClientUrl(project) {
  if (!project.url) throw new RecordError('project url should not be empty');
}

function validate(project) {
  validateOnClientUrl(project);

  if (!project.username) throw new RecordError(
    'project user\'s name should not be empty');

  if (!project.password) throw new RecordError(
    'project user\'s password should not be empty');
}
