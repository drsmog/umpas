const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const Promise = require('bluebird');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

global.Promise = Promise;

const umpackServer = require('./helpers/umpack-server');
const projectHooks = require('./helpers/project-db-hooks');
const umpackHooks = require('./helpers/umpack-db-hooks');
const utils = require('./helpers/utils');

chai.use(chaiHttp);

describe('roles routes', function() {
  const app = require('../app');
  const baseUrl = '/api/roles';

  before(function() {
    return Promise.all([
        projectHooks.truncateProjectsCollection(),
        umpackHooks.truncateRolesCollection()
      ])
      .then(function() {
        return Promise.all([
          projectHooks.insertTestProject(),
          umpackHooks.insertAdminRole()
        ]);
      });
  });

  beforeEach(function() {
    return umpackHooks.truncateUsersCollection()
      .then(function() {
        return umpackHooks.insertRootUser();
      });
  });

  describe('GET /', function() {

    it('should return roles', function() {

      return umpackHooks.insertRoles([{
          name: 'test',
          actions: [{
            id: new ObjectId(),
            pattern: '/api/*',
            name: 'api',
            verbGet: true,
            verbPost: true,
            verbPut: false,
            verbDelete: false
          }]
        }])
        .then(function() {
          return projectHooks.getTestProject();
        })
        .then(function(project) {
          return chai.request(app)
            .get(baseUrl)
            .query({
              projectId: project._id.toString()
            });
        })
        .then(function(res) {
          res.should.have.status(200);

          should.exist(res.body);
          res.body.success.should.equal(true);

          should.exist(res.body.data);
          res.body.data.should.have.length(2);

          const nonAdminRole = res.body.data.find(role => role.name ===
            'test');

          should.exist(nonAdminRole);

          nonAdminRole.should.have.property('actions');
          nonAdminRole.actions.should.have.length(1);

        });

    });
  });
});
