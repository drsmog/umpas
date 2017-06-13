const projectRepo = require('../infrastructure/projectsRepository');
const RecordError = require('../exceptions/recordError');
const Promise = require('bluebird');

exports.getList = function() {
  return projectRepo.find({});
};

exports.addProject = function(project) {
  return Promise.try(function() {
      validateOnClientUrl(project);

      return projectRepo.save(project);
    })
    .then(function(id) {
      return projectRepo.getById(id);
    });
};

exports.editProjectDetails = function(id, project) {
  return Promise.try(function() {
      validateOnClientUrl(project);

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

function validateOnClientUrl(project) {
  if (!project.url) throw new RecordError('project url should not be empty');
}
