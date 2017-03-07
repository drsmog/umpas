import { Injectable } from '@angular/core';
import { ProjectApiService } from './project-api.service';



@Injectable()
export class ProjectService {

  projects: any = [];
  selectedProject: any;

  get projectList() {
    return this.projects;
  }

  constructor(private api:ProjectApiService) { }

  fetchProjects(){
    return this.api.getProjects()
    .then((list)=>this.projects=list);
  }

  save(project) {

    let isEditMode = (project) => { return project.id != null };

    let refreshProject = (project) => {
      let projectItmeIndex = this.projects.findIndex((item) => item.id === project.id);
      if (projectItmeIndex === -1) return;
      Object.assign(this.projects[projectItmeIndex], project);
    };

    let pushProject = (savedProject) => {
      this.projects.push(savedProject);
    };

    if (isEditMode(project))
      return this.api.putProject(project).
        then(refreshProject.bind(this, project));

    this.api.postProject(project)
      .then(pushProject);

  }


}
