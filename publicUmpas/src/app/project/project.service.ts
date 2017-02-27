import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProjectService {

  projects: any = [];

  selectedProject: any;
  newProject: any = {};

  private headers = new Headers({
    'Content-type': 'application/json'
  });

  private url = 'api/projects';

  get projectList() {
    return this.projects;
  }

  constructor(private http: Http) { }

  // Crud api
  loadProjectList() {
    return this.http.get(this.url).toPromise()
      .then(response => this.projects = response.json().data);
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
  // end crud api

  save(project) {

    if (project.id) //edit mode
      return this.updateProject(project).
        then(updatedProjectId => {
          let projectIndex = this.getProjectListIndex(project);
          if (projectIndex === null) return; //TODO throw exception
          this.projects[projectIndex] = Object.assign({}, project);
        });


    this.postProject(project)
      .then(result => {
        project.id = result.id;
        this.projects.push(project);
        this.newProject = {};
      });
  }



  getProjectListIndex(project) {

    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === project.id) {
        return i;
      }
    }

    return null;

  }




}
