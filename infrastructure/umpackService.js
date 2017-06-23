const rp = require('request-promise');

class UmpackService {
  constructor(project) {
    this.project = project;
  }

  login() {
    const options = {
      method: 'POST',
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

  activateUser(userId) {
    const activated = true;
    const options = this._statusUpdateOptions(activated);

    return rp(options);
  }

  deactivateUser(userId) {
    const isActivated = false;

    const options = this._statusUpdateOptions(isActivated);

    return rp(options);
  }

  getAllUsers() {
    const options = {
      method: 'GET',
      uri: this.project.umFullUrl + '/users',
      headers: this._getHeaders(),
      json: true
    };

    return rp(options);
  }

  getUserById(id) {
    const options = {
      uri: this.project.umFullUrl + '/users/' + id,
      headers: this._getHeaders(),
      json: true
    };

    return rp(options);
  }

  deleteUser(id) {
    const options = {
      method: 'DELETE',
      uri: this.project.umBaseUrl + '/users/' + id,
      headers: this._getHeaders(),
      json: true
    };

    return rp(options);
  }

  changeUserInfo(id, info) {
    const options = {
      method: 'PUT',
      uri: this.project.umBaseUrl + '/users/' + id,
      body: info,
      headers: this._getHeaders(),
      json: true
    };

    return rp(options);
  }

  _statusUpdateOptions(isActivated) {
    const options = {
      method: 'POST',
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
