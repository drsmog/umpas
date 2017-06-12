const projectRepo = require('../infrastructure/projectsRepository');

function getList() {
  return projectRepo.find();
}

function addProject(project) {
  return projectRepo.save(project)
    .then(function (id) {
      return projectRepo.getById(id);
    });
}

function editProjectDetails(id, project) {
  if (!project.id) {
    project.id = id;
  }

  return projectRepo.update(project)
    .then(function () {
      return projectRepo.getById(id);
    });
}
