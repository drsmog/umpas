import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProjectService {

  selectedProject: any;
  newProjectItem: any={};

  private headers = new Headers({
    'Content-type': 'application/json'
  });

  private url = 'api/projects';

  constructor(private http: Http) { }

  getProjectList() {
    return this.http.get(this.url).toPromise()
      .then(response => response.json().data);
  }

  postProject(project) {
    return this.http.post(
      this.url,
      JSON.stringify(project),
      { headers: this.headers }).toPromise()
      .then(response => response.json().data);
  }

  updateProject(project) {
    return this.http.put(
      this.url,
      JSON.stringify(project),
      { headers: this.headers }).toPromise()
      .then(response => response.json().data);
  }



}
