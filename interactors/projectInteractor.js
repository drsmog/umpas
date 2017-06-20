const projectRepo = require('../infrastructure/projectsRepository');
const RecordError = require('../exceptions/recordError');
const Promise = require('bluebird');

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

function validateOnClientUrl(project) {
  if (!project.url) throw new RecordError('project url should not be empty');
}

function validate(project) {
  validateOnClientUrl(project);

  if(!project.username) throw new RecordError('project user\'s name should not be empty');

  if(!project.password) throw new RecordError('project user\'s password should not be empty');
}
