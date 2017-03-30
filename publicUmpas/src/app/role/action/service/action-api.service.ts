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



  getActions(roleId) {
    let requestUrl = `${this.url}/?roleId=${roleId}`;
    return this.http.get(requestUrl).toPromise()
      .then((result) => result.json().data);
  }

  postAction(action,roleId) {
    let requestUrl =`${this.url}/?roleId=${roleId}`;
    return this.http.post(requestUrl,
      JSON.stringify(action),
      { headers: this.headers }).toPromise()
      .then((result) => result.json().data);
  }



  putAction(action,roleId) {
    let requestUrl =`${this.url}/${action.id}?roleId=${roleId}`;
    return this.http.put(
      requestUrl,
      JSON.stringify(action),
      { headers: this.headers }).toPromise();

  }

  deleteAction(roleId, actionId) {
    let requestUrl = `${this.url}/${actionId}/?roleId=${roleId}`;

    return this.http.delete(requestUrl).toPromise();

  }

}
