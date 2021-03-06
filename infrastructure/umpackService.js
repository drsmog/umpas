const rp = require('request-promise');
const device = require('../device');

const getVerb = 'GET';
const postVerb = 'POST';
const putVerb = 'PUT';
const deleteVerb = 'DELETE';

class UmpackService {
  constructor(project) {
    this.project = project;
    this.loggedIn = false;
  }

  login() {
    this.loggedIn = true;

    const options = {
      method: postVerb,
      uri: this.project.umFullUrl + '/login',
      body: {
        userName: this.project.username,
        password: this.project.password,
        deviceToken: device.deviceToken
      },
      json: true
    };

    return rp(options)
      .then(function(token) {
        this.token = token;
      }.bind(this));
  }

  logout() {
    this.loggedIn = false;

    this.token = null;
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

  getUserByUsername(username) {
    return this._request(getVerb, `/users/${username}/full`);
  }

  deleteUser(id) {
    return this._request(deleteVerb, `/users/${id}`);
  }

  changeUserInfo(id, info) {
    return this._request(putVerb, `/users/${id}/info`, info);
  }

  assignUserRole(userId, role) {
    return this._userRoleUpdate(userId, role, true);
  }

  removeUserRole(userId, role) {
    return this._userRoleUpdate(userId, role, false);
  }

  resetUserPassword(userId) {
    return this._request(deleteVerb, `/users/${userId}/password`);
  }

  _userRoleUpdate(userId, role, enable) {
    return this._request(postVerb, '/updateUserRoles', {
      userId: userId,
      roleName: role,
      enable: enable
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

  createRole(role, description) {
    return this._request(postVerb, '/roles', {
      name: role,
      description: description
    });
  }

  permitActionToRole(role, action) {
    return this._request(postVerb, `/roles/${role}/actions`, action);
  }

  editRoleAction(role, action) {
    return this._request(putVerb, `/roles/${role}/actions/${action.id}`,
      action);
  }

  removePermittedActionFromRole(role, actionId) {
    return this._request(deleteVerb, `/roles/${role}/actions/${actionId}`);
  }

  initializeUm(deviceToken) {
    return this._request(postVerb, '/initialization', {
      umBaseUrl: this.project.umBaseUrl,
      deviceToken: deviceToken
    });
  }

  changeUsername(userId, newUsername) {
    return this._request(putVerb, `/users/${userId}/userName`, {
      userName: newUsername
    });
  }

  changeRole(role, roleInfo) {
    return this._request(putVerb, `/roles/${role}`, roleInfo);
  }

  getUserDevices(userName) {
    return this._request(getVerb, `/users/${userName}/devices`);
  }

  grantUserDeviceAccess(userName, deviceToken) {
    return this._request(postVerb, `/users/${userName}/devices/access`, {
      deviceToken: deviceToken
    });
  }

  restrictUserDevice(userName, deviceToken) {
    return this._request(postVerb, `/users/${userName}/devices/restriction`, {
      deviceToken: deviceToken
    });
  }

  _rpOptions(method, routeUrl, body) {
    const options = {
      method: method,
      uri: this.project.umFullUrl + routeUrl,
      headers: this._getHeaders(),
      json: true
    };

    if (body) options.body = body;

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
