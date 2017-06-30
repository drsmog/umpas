import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { objectToRawString } from '../../utils';

@Injectable()
export class RoleApiService {

  private headers = new Headers({
    'Content-type': 'application/json'
  });

  private url = 'api/roles';

  constructor(private http: Http) { }

  getRoles(projectId) {
    const searchString = objectToRawString({ projectId: projectId });

    return this.http.get(this.url, { search: searchString }).toPromise()
      .then((result) => result.json().data);
  }

  postRole(projectId, role) {
    const searchString = objectToRawString({ projectId: projectId });

    return this.http.post(this.url,
      JSON.stringify(role),
      { headers: this.headers, search: searchString }).toPromise()
      .then((result) => result.json().data);
  }

  putRole(projectId, role) {
    const searchString = objectToRawString({ projectId: projectId });

    return this.http.put(
      `${this.url}/${role.name}`,
      JSON.stringify(role),
      { headers: this.headers, search: searchString }).toPromise();

  }

  deleteRole(projectId, role) {
    const searchString = objectToRawString({ projectId: projectId });

    return this.http.delete(
      `${this.url}/${role.name}`,
      { headers: this.headers, search: searchString }).toPromise();
  }

}
