const projectRepo = require('../infrastructure/projectsRepository');

exports.getList = function() {
  return projectRepo.find();
};

exports.addProject = function(project) {
  return projectRepo.save(project)
    .then(function(id) {
      return projectRepo.getById(id);
    });
};

exports.editProjectDetails = function(id, project) {
  if (!project.id) {
    project.id = id;
  }

  return projectRepo.update(project)
    .then(function() {
      return projectRepo.getById(id);
    });
};

exports.removeProject = function (id) {
  return projectRepo.deleteById(id);
};
