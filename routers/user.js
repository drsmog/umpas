const router = require('express').Router();
const sendPromiseResult = require('../utils/responseSender').sendPromiseResult;
const userInteractor = require('../interactors/userInteractor');

const baseUrl = '/api/users';

router.get('/', function(req, res, next) {
  const promise = userInteractor.getFullUsersList(req.query.projectId);

  sendPromiseResult(promise, req, res, next);
});

router.delete('/:id', function(req, res, next) {
  const promise = userInteractor.deleteUser(req.query.projectId, req.params
    .id);

  sendPromiseResult(promise, req, res, next);
});

router.put('/:id', function(req, res, next) {
  const projectId = req.query.projectId;
  const userId = req.params.id;
  const user = req.body;

  const promise = userInteractor.updateFullUser(projectId, userId, user);

  sendPromiseResult(promise, req, res, next);
});

router.put('/:id/info', function(req, res, next) {
  const promise = userInteractor.changeUserInfo(req.query.projectId, req.params
    .id, req.body);

  sendPromiseResult(promise, req, res, next);
});

router.put('/:id/roles/:role', function(req, res, next) {
  const projectId = req.query.projectId;
  const userId = req.params.id;
  const role = req.params.role;

  const promise = userInteractor.assignRole(projectId, userId, role);

  sendPromiseResult(promise, req, res, next);
});

router.delete('/:id/roles/:role', function(req, res, next) {
  const projectId = req.query.projectId;
  const userId = req.params.id;
  const role = req.params.role;

  const promise = userInteractor.unassignRole(projectId, userId, role);

  sendPromiseResult(promise, req, res, next);
});

router.put('/:id/activation', function(req, res, next) {
  const projectId = req.query.projectId;
  const userId = req.params.id;

  const promise = userInteractor.activate(projectId, userId);

  sendPromiseResult(promise, req, res, next);
});

router.delete('/:id/activation', function(req, res, next) {
  const projectId = req.query.projectId;
  const userId = req.params.id;

  const promise = userInteractor.deactivate(projectId, userId);

  sendPromiseResult(promise, req, res, next);
});

router.post('/', function(req, res, next) {
  const projectId = req.query.projectId;

  const promise = userInteractor.registerInactiveUser(projectId, req.body);

  sendPromiseResult(promise, req, res, next);
});

router.delete('/:id/password', function(req, res, next) {
  const projectId = req.params.projectId;
  const userId = req.params.id;

  const promise = userInteractor.resetUserPassword(projectId, userId);

  sendPromiseResult(promise, req, res, next);
});


module.exports = {
  baseUrl: baseUrl,
  router: router
};
