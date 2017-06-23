const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const Promise = require('bluebird');
const mongoose = require('mongoose');

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

  beforeEach(function () {
    return umpackHooks.truncateUsersCollection()
      .then(function () {
        return umpackHooks.insertRootUser();
      });
  });

  describe('GET /', function() {

    it('should return full users', function() {
      const username = 'irakli';

      return umpackHooks.insertUsers([
        {
          userName: username,
          password: utils.passwordHash(password),
          email: 'irakli@test.com',
          firstName: 'irakli',
          additionalInfo: 'I am programmer',
          metaData: {
            one: 'two'
          }
        }
      ])
        .then(function () {
          return chai.request(app)
            .get(baseUrl);
        })
        .then(function (res) {
          res.should.have.status(200);

          should.exist(res.body);

          res.body.success.should.equal(true);
          res.body.should.have.property('data');

          res.body.data.should.have.length(2); //including root user

          const nonRootUser = res.body.data.find(user => user.userName === username);

          should.exist(nonRootUser); // user with userName irakli should be returned

          nonRootUser.should.have.property('email');
          nonRootUser.should.have.property('firstName', 'irakli');
          nonRootUser.should.have.property('additionalInfo');
          nonRootUser.should.have.property('metaData');

          nonRootUser.metaData.should.have.property('one', 'two');
        });

    });

  });
});
