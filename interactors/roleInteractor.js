const Promise = require('bluebird');
const _ = require('lodash');
const projectInteractor = require('./projectInteractor');

exports.getFullRoles = function (projectId) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function (service) {
      return Promise.map(service.getRoles(), function (role) {
        return service.getFullRole(role);
      });
    });
};

exports.deleteRole = function (projectId, role) {
  return projectInteractor.getLoggedInProjectService(projectId)
    .then(function (service) {
      return service.deleteRole(role);
    });
};
