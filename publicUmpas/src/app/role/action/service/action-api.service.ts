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

  // postActions(action,role) {
  //   let requestUrl =`${this.url}/?roleId=${roleId}`;
  //   return this.http.post(requestUrl,
  //     JSON.stringify(action),
  //     { headers: this.headers }).toPromise()
  //     .then((result) => result.json().data);
  // }



  // putons(action) {
  //   return this.http.put(
  //     `${this.url}/${action.id}`,
  //     JSON.stringify(action),
  //     { headers: this.headers }).toPromise();
  //
  // }

  deleteAction(roleId, actionId) {
    let requestUrl = `${this.url}/${actionId}/?roleId=${roleId}`;

    return this.http.delete(requestUrl).toPromise();

  }

}
