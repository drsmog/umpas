const router = require('express').Router();
// const logger = require('../utils/logger').getLogger('app');
const projectInteractor = require('../interactors/projectInteractor');
const sendPromiseResult = require('../utils/responseSender').sendPromiseResult;

router.get('/', function(req, res, next) {

  const promise = projectInteractor.getList();

  sendPromiseResult(promise, req, res, next);

});

router.post('/', function(req, res, next) {

  const promise = projectInteractor.addProject(req.body);

  sendPromiseResult(promise, req, res, next);

});

router.put('/:id', function(req, res, next) {

  const promise = projectInteractor.editProjectDetails(req.params.id, req.body);

  sendPromiseResult(promise, req, res, next);

});

router.delete('/:id', function(req, res, next) {

  const promise = projectInteractor.removeProject(req.params.id);

  sendPromiseResult(promise, req, res, next);

});

router.post('/:id/initialization', function(req, res, next) {

  const promise = projectInteractor.initializeExistingProjectUm(req.params.id);

  sendPromiseResult(promise, req, res, next);

});

router.post('/initialization', function(req, res, next) {
  const promise = projectInteractor.initializeProjectUm(req.body);

  sendPromiseResult(promise, req, res, next);
});

router.post('/:id', function(req, res, next) {
  const promise = projectInteractor.cloneProjectData(req.body.projectId, req.params.id);

  sendPromiseResult(promise, req, res, next);
});

router.post('/:id/login', function (req, res, next) {
  const promise = projectInteractor.loginProject(req.params.id);

  sendPromiseResult(promise, req, res, next);
});

router.post('/:id/roles', function(req, res, next) {
  const promise = projectInteractor.cloneProjectRoles(req.body.projectId, req.params.id);

  sendPromiseResult(promise, req, res, next);
});

router.post('/:id/users', function(req, res, next) {
  const promise = projectInteractor.cloneProjectUsers(req.body.projectId, req.params.id);

  sendPromiseResult(promise, req, res, next);
});


module.exports = router;
