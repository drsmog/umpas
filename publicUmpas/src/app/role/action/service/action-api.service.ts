import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActionApiService {


  private headers = new Headers({
    'Content-type': 'application/json'
  });

  private url = 'api/actions';

  constructor(private http: Http) { }



  getActions(projectId, roleName) {
    let requestUrl = `${this.url}/?roleName=${roleName}&projectId=${projectId}`;
    return this.http.get(requestUrl).toPromise()
      .then((result) => result.json().data);
  }

  postAction(projectId, action, roleName) {
    let requestUrl = `${this.url}/?roleName=${roleName}&projectId=${projectId}`;
    return this.http.post(requestUrl,
      JSON.stringify(action),
      { headers: this.headers }).toPromise()
      .then((result) => result.json().data);
  }



  putAction(projectId, action, roleName) {
    let requestUrl = `${this.url}/${action.id}?roleName=${roleName}&projectId=${projectId}`;
    return this.http.put(
      requestUrl,
      JSON.stringify(action),
      { headers: this.headers }).toPromise();

  }

  deleteAction(projectId, roleName, actionId) {
    let requestUrl = `${this.url}/${actionId}/?roleName=${roleName}&projectId=${projectId}`;

    return this.http.delete(requestUrl).toPromise();

  }

}
