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
      return this.http.get(this.urlWithRoleId(roleId)).toPromise()
        .then((result) => result.json().data);
    }

    postActions(action,role) {
      return this.http.post(this.urlWithRoleId(role),
        JSON.stringify(action),
        { headers: this.headers }).toPromise()
        .then((result) => result.json().data);
    }

    // putActions(action) {
    //   return this.http.put(
    //     `${this.url}/${action.id}`,
    //     JSON.stringify(action),
    //     { headers: this.headers }).toPromise();
    //
    // }

    urlWithRoleId(roleId){
      return `${this.url}/?roleId=${roleId}`;

    }

}
