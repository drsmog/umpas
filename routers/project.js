const router = require('express').Router();
const logger = require('./utils/logger').getLogger('app');

router.get('/', function(req, res, next) {
    logger.info('Working');
    return res.send('hellow world');
});

module.exports = router;
