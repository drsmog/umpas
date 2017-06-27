import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class UserApiService {

  private url = 'api/users';

  private headers = new Headers({
    'Content-type': 'application/json'
  });

  constructor(private http: Http) { }

  private projectIdRaw(projectId) {
    return `projectId=${projectId}`;
  }

  getUsers(projectId) {
    return this.http.get(this.url, { search: this.projectIdRaw(projectId) }).toPromise()
      .then((result) => result.json().data);
  }

  updateUser(projectId, user) {
    return this.http.put(this.url + '/' + user.id, user, { headers: this.headers, search: this.projectIdRaw(projectId) })
      .toPromise();
  }

  removeUser(projectId, user) {
    return this.http.delete(this.url + '/' + user.id, { search: this.projectIdRaw(projectId) })
      .toPromise();
  }


}
