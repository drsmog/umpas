const router = require('express').Router();
// const logger = require('../utils/logger').getLogger('app');

router.get('/', function(req, res, next) {

    let projects = [{
            id: 1,
            name: 'dayCenter',
            description: 'baby care organizations',
        }, {
            id: 2,
            name: 'high mountine',
            description: 'Benefits for village doctors',
        }, {
            id: 3,
            name: 'Help Desk',
            description: 'ehealth internal helpdesk system',
        },

    ];


    return res.send({
        success: true,
        data: projects,
    });

});

router.post('/', function(req, res, next) {

  return res.send({success: true, data: {id: 5}});

});

router.put('/', function(req, res, next) {

  return res.send({success: true, data: {}});

});

router.get('/sdf', function(req, res, next) {


});

module.exports = router;
