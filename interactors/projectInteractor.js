const projectRepo = require('../infrastructure/projectsRepository');
const RecordError = require('../exceptions/recordError');
const Promise = require('bluebird');
const UmpackService = require('../infrastructure/umpackService');
const Project = require('../models/project');
const _ = require('lodash');

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
  return projectRepo.getById(projectId)
    .then(function(project) {
      return new UmpackService(project);
    });
};

exports.getLoggedInProjectService = function(projectId) {
  return exports.getProjectService(projectId)
    .then(function(service) {
      return service.login()
        .then(function() {
          return service;
        });
    });
};

exports.initializeExistingProjectUm = function(projectId) {
  return projectRepo.getById(projectId)
    .then(function(project) {
      const service = new UmpackService(project);

      return service.initializeUm()
        .then(function(result) {
          if (result.password) project.initializeUser(result.password);

          return project.save();
        });
    });
};

exports.initializeProjectUm = function (projectObject) {
  return Promise.try(function () {
    validateOnClientUrl(projectObject);

    const project = new Project(projectObject);

    const service = new UmpackService(project);

    return service.initializeUm()
      .then(function (result) {
        if (result.password) project.initializeUser(result.password);

        const projectToReturn = _.omit(project.toObject(), ['id', '_id']);

        return projectToReturn;
      });
  });
};

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
