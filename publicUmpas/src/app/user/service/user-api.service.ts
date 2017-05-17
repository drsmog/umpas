import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class UserApiService {

  private url = 'api/users';

  private headers = new Headers({
    'Content-type': 'application/json'
  });


  constructor(private http: Http) { }

  getUsers() {
    return this.http.get(this.url).toPromise()
      .then((result) => result.json().data);
  }

  updateUser(user) {
    return this.http.put(this.url + '/' + user.id, user, { headers: this.headers })
      .toPromise();
  }

  removeUser(user) {
    return this.http.delete(this.url + '/' + user.id)
      .toPromise();
  }


}
