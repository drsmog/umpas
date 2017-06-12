const router = require('express').Router();
// const logger = require('../utils/logger').getLogger('app');
const projectInteractor = require('../interactors/projectInteractor');
const sendPromiseResult = require('../utils/responseSender');

router.get('/', function(req, res, next) {

    const promise = projectInteractor.getList();

    sendPromiseResult(promise, req, res, next);

});

router.post('/', function(req, res, next) {

    return res.send({
        success: true,
        data: {
            id: 5,
        },
    });

});

router.put('/', function(req, res, next) {

    return res.send({
        success: true,
        data: {},
    });

});

router.get('/sdf', function(req, res, next) {


});

module.exports = router;
