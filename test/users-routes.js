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

const password = '123456';


describe('users routes', function() {
  const app = require('../app');
  const baseUrl = '/api/users';

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

    it('should return full users', function() {
      const username = 'irakli';

      return umpackHooks.insertUsers([{
          userName: username,
          password: utils.passwordHash(password),
          email: 'irakli@test.com',
          firstName: 'irakli',
          additionalInfo: 'I am programmer',
          metaData: {
            one: 'two'
          }
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
          res.body.should.have.property('data');

          res.body.data.should.have.length(2); //including root user

          const nonRootUser = res.body.data.find(user => user.userName ===
            username);

          should.exist(nonRootUser); // user with userName irakli should be returned

          nonRootUser.should.have.property('email');
          nonRootUser.should.have.property('firstName', 'irakli');
          nonRootUser.should.have.property('additionalInfo');
          nonRootUser.should.have.property('metaData');

          nonRootUser.metaData.should.have.property('one', 'two');
        });

    });

  });

  describe('DELETE /:id/password', function() {
    it('should set random password', function() {
      const username = 'irakli';
      const id = new ObjectId();

      return umpackHooks.insertUsers([{
          _id: id,
          userName: username,
          password: utils.passwordHash(password),
          email: 'irakli@test.com',
          firstName: 'irakli',
          additionalInfo: 'I am programmer',
          metaData: {
            one: 'two'
          }
        }])
        .then(function() {
          return projectHooks.getTestProject();
        })
        .then(function(project) {
          return chai.request(app)
            .delete(`${baseUrl}/${id}/password`)
            .query({
              projectId: project._id.toString()
            });
        })
        .then(function(res) {
          res.should.have.status(200);

          should.exist(res.body);

          res.body.should.have.property('success', true);
          res.body.should.have.property('data');

          res.body.data.should.be.a('string');
        });
    });
  });

  describe('PUT /:id/roles/:role', function() {
    it('should assign role when user has no roles', function() {
      const id = new ObjectId();

      return umpackHooks.insertUsers([{
          _id: id,
          userName: 'irakli',
          password: utils.passwordHash(password),
          email: 'irakli@test.com',
          firstName: 'irakli',
          additionalInfo: 'I am programmer',
          metaData: {
            one: 'two'
          },
          roles: []
        }])
        .then(function() {
          return projectHooks.getTestProject();
        })
        .then(function(project) {
          return chai.request(app)
            .put(`${baseUrl}/${id}/roles/user`)
            .query({
              projectId: project._id.toString()
            });
        })
        .then(function(res) {
          res.should.have.status(200);

          should.exist(res.body);

          res.body.should.have.property('success', true);

          return umpackHooks.findUser(id);
        })
        .then(function(user) {
          should.exist(user.roles);

          user.roles.should.have.length(1);

          user.roles[0].should.equal('user');
        });
    });
  });
});
