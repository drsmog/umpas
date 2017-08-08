const router = require('express').Router();
const sendPromiseResult = require('../utils/responseSender').sendPromiseResult;
const roleInteractor = require('../interactors/roleInteractor');

const baseUrl = '/api/roles';

router.get('/', function (req, res, next) {
  const promise = roleInteractor.getRoles(req.query.projectId);

  sendPromiseResult(promise, req, res, next);
});

router.post('/', function (req, res, next) {
  const promise = roleInteractor.createRole(req.query.projectId, req.body);

  sendPromiseResult(promise, req, res, next);
});

router.put('/:role', function (req, res, next) {
  const promise = roleInteractor.editRole(req.query.projectId, req.params.role, req.body);

  sendPromiseResult(promise, req, res, next);
});

router.delete('/:role', function (req, res, next) {
  const promise = roleInteractor.deleteRole(req.query.projectId, req.params.role);

  sendPromiseResult(promise, req, res, next);
});


module.exports = {
  baseUrl: baseUrl,
  router: router
};
