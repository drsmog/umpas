const router = require('express').Router();
const sendPromiseResult = require('../utils/responseSender').sendPromiseResult;
const userInteractor = require('../interactors/userInteractor');

const baseUrl = '/api/projects/:projectId/users';

router.get('/', function(req, res, next) {
  const promise = userInteractor.getFullUsersList(req.params.projectId);

  sendPromiseResult(promise, req, res, next);
});

router.delete('/:id', function(req, res, next) {
  const promise = userInteractor.deleteUser(req.params.id);

  sendPromiseResult(promise, req, res, next);
});

router.put('/:id/info', function(req, res, next) {
  const promise = userInteractor.changeUserInfo(req.params.id, req.body);

  sendPromiseResult(promise, req, res, next);
});



module.exports = {
  baseUrl: baseUrl,
  router: router
};
