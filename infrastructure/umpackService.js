const rp = require('request-promise');

const getVerb = 'GET';
const postVerb = 'POST';
const putVerb = 'PUT';
const deleteVerb = 'DELETE';

class UmpackService {
  constructor(project) {
    this.project = project;
  }

  login() {
    const options = {
      method: postVerb,
      uri: this.project.umFullUrl + '/login',
      body: {
        userName: this.project.username,
        password: this.project.password
      },
      json: true
    };

    return rp(options)
      .then(function(token) {
        this.token = token;
      }.bind(this));
  }

  signup(user) {
    const options = {
      method: postVerb,
      uri: this.project.umFullUrl + '/signup',
      body: user,
      json: true
    };

    return rp(options);
  }

  activateUser(userId) {
    const activated = true;
    const options = this._statusUpdateOptions(userId, activated);

    return rp(options);
  }

  deactivateUser(userId) {
    const isActivated = false;

    const options = this._statusUpdateOptions(userId, isActivated);

    return rp(options);
  }

  getAllUsers() {
    return this._request(getVerb, '/users');
  }

  getUserById(id) {
    return this._request(getVerb, `/users/${id}`);
  }

  deleteUser(id) {
    return this._request(deleteVerb, `/users/${id}`);
  }

  changeUserInfo(id, info) {
    return this._request(putVerb, `/users/${id}/info`, info);
  }

  assignUserRole(userId, role) {
    const options = this._userRoleUpdateOptions(userId, role, true);

    return rp(options);
  }

  removeUserRole(userId, role) {
    const options = this._userRoleUpdateOptions(userId, role, false);

    return rp(options);
  }

  _userRoleUpdateOptions(userId, role, enable) {
    return this._request(postVerb, '/updateUserRoles', {
      userId: userId,
      roleName: role,
      enable: enable ? 'true': 'false'
    });
  }

  updateMetadata(metadata) {
    return this._request(putVerb, '/metadata', metadata);
  }

  getRoles() {
    return this._request(getVerb, '/roles');
  }

  getFullRole(role) {
    return this._request(getVerb, `/roles/${role}`);
  }

  deleteRole(role) {
    return this._request(deleteVerb, `/roles/${role}`);
  }

  createRole(role) {
    return this._request(postVerb, '/roles', {name: role});
  }

  permitActionToRole(role, action) {
    return this._request(postVerb, `/roles/${role}/actions`, action);
  }

  editRoleAction(role, action) {
    return this._request(putVerb, `/roles/${role}/actions/${action.id}`, action);
  }

  removePermittedActionFromRole(role, actionId) {
    return this._request(deleteVerb, `/roles/${role}/actions/${actionId}`);
  }

  _rpOptions(method, routeUrl, body) {
    const options = {
      method: method,
      uri: this.project.umFullUrl + routeUrl,
      headers: this._getHeaders(),
      json: true
    };

    if(body) options.body = body;

    return options;
  }

  _request(method, routeUrl, body) {
    const options = this._rpOptions(method, routeUrl, body);

    return rp(options);
  }

  _statusUpdateOptions(userId, isActivated) {
    const options = {
      method: postVerb,
      uri: this.project.umFullUrl + '/updateUserStatus',
      headers: this._getHeaders(),
      body: {
        id: userId,
        isActivated: isActivated
      },
      json: true
    };

    return options;
  }

  _getHeaders() {
    return {
      authorization: this.token
    };
  }

}


module.exports = UmpackService;
