const router = require('express').Router();
const sendPromiseResult = require('../utils/responseSender').sendPromiseResult;
const userInteractor = require('../interactors/userInteractor');

const baseUrl = '/api/projects/:projectId/users';

router.get('/', function(req, res, next) {
  const promise = userInteractor.getFullUsersList(req.params.projectId);

  sendPromiseResult(promise, req, res, next);
});

router.delete('/:id', function(req, res, next) {
  const promise = userInteractor.deleteUser(req.params.projectId, req.params.id);

  sendPromiseResult(promise, req, res, next);
});

router.put('/:id', function (req, res, next) {
  const projectId = req.params.projectId;
  const userId = req.params.id;
  const user = req.body;

  const promise = userInteractor.updateFullUser(projectId, userId, user);

  sendPromiseResult(promise, req, res, next);
});

router.put('/:id/info', function(req, res, next) {
  const promise = userInteractor.changeUserInfo(req.params.projectId, req.params.id, req.body);

  sendPromiseResult(promise, req, res, next);
});

router.put('/:id/roles/:role', function (req, res, next) {
  const projectId = req.params.projectId;
  const userId = req.params.id;
  const role = req.params.role;

  const promise = userInteractor.assignRole(projectId, userId, role);

  sendPromiseResult(promise, req, res, next);
});

router.delete('/:id/roles/:role', function (req, res, next) {
  const projectId = req.params.projectId;
  const userId = req.params.id;
  const role = req.params.role;

  const promise = userInteractor.unassignRole(projectId, userId, role);

  sendPromiseResult(promise, req, res, next);
});

router.post('/:id/activation', function (req, res, next) {
  const projectId = req.params.projectId;
  const userId = req.params.id;

  const promise = userInteractor.activate(projectId, userId);

  sendPromiseResult(promise, req, res, next);
});

router.delete('/:id/activation', function (req, res, next) {
  const projectId = req.params.projectId;
  const userId = req.params.id;

  const promise = userInteractor.deactivate(projectId, userId);

  sendPromiseResult(promise, req, res, next);
});


module.exports = {
  baseUrl: baseUrl,
  router: router
};
