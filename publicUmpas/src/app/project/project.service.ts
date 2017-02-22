import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProjectService {

  projects: any = [];
  selectedProject: any;


  private headers = new Headers({
    'Content-type': 'application/json'
  });

  private url = 'api/projects';

  get projectList() {
    return this.projects;
  }

  constructor(private http: Http) { }

  loadProjectList() {
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


  save(project) {
    console.log(project);

    if (project.id)
      return this.updateProject(project);
    this.addNewProject(project);
  }

  addNewProject(project) {
    this.postProject(project)
      .then(result => {
        project.id = result.id;
        //this.projects.push(project);
      });
  }

  editProject(project) {

    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === project.id) {

        this.projects[i] = project;
        this.selectedProject = project;
        return;
      }
    }

  }




}
