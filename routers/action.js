const router = require('express').Router();
const actionInteractor = require('../interactors/actionInteractor');
const sendPromiseResult = require('../utils/responseSender').sendPromiseResult;

const baseUrl = '/api/actions';

router.get('/', function(req, res, next) {
  const promise = actionInteractor.getActions(req.query.projectId, req.query
    .roleName);

  sendPromiseResult(promise, req, res, next);
});

router.post('/', function(req, res, next) {
  const promise = actionInteractor.permitAction(req.query.projectId, req.query
    .roleName, req.body);

  sendPromiseResult(promise, req, res, next);
});

router.put('/:id', function(req, res, next) {
  const projectId = req.query.projectId;
  const role = req.query.roleName;
  const actionId = req.params.id;
  const action = req.body;

  const promise = actionInteractor.editAction(projectId, role, actionId,
    action);

  sendPromiseResult(promise, req, res, next);
});

router.delete('/:id', function(req, res, next) {
  const projectId = req.query.projectId;
  const role = req.query.roleName;
  const actionId = req.params.id;

  const promise = actionInteractor.removePermittedAction(projectId, role,
    actionId);

  sendPromiseResult(promise, req, res, next);
});


module.exports = {
  baseUrl: baseUrl,
  router: router
};
