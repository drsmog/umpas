const Promise = require('bluebird');
const UmpackService = require('../infrastructure/umpackService');
const projectRepository = require('../infrastructure/projectsRepository');

exports.getFullUsersList = function(projectId) {
  return projectRepository.getById(projectId)
    .then(function(project) {
      const umService = new UmpackService(project);

      return umService.login()
        .then(function() {
          return umService;
        });
    })
    .then(function(umService) {

      return umService.getAllUsers()
        .then(function(users) {
          return Promise.map(users, function(user) {
            return umService.getUserById(user.id);
          });
        });

    });
};
