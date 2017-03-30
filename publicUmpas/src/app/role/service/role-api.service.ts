import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoleApiService {

  private headers = new Headers({
    'Content-type': 'application/json'
  });

  private url = 'api/roles';

  constructor(private http: Http) { }

  getRoles() {
    return this.http.get(this.url).toPromise()
      .then((result) => result.json().data);
  }

  postRole(role) {
    return this.http.post(this.url,
      JSON.stringify(role),
      { headers: this.headers }).toPromise()
      .then((result) => result.json().data);
  }

  putRole(role) {
    return this.http.put(
      `${this.url}/${role.id}`,
      JSON.stringify(role),
      { headers: this.headers }).toPromise();

  }

  deleteRole(role) {
    return this.http.delete(
      `${this.url}/${role.id}`,
      { headers: this.headers }).toPromise();
  }

}
