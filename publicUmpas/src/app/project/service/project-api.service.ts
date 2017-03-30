import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectApiService {

  private headers = new Headers({
    'Content-type': 'application/json'
  });

  private url = 'api/projects';


  constructor(private http: Http) { }


  getProjects() {
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

  putProject(project) {
    return this.http.put(
      `${this.url}/${project.id}`,
      JSON.stringify(project),
      { headers: this.headers }).toPromise();


  }

  deleteProject(project){
    return this.http.delete(
      `${this.url}/${project.id}`,
      { headers: this.headers }).toPromise();
  }


}
