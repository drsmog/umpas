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




}
