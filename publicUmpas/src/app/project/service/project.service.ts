import { Injectable } from '@angular/core';
import { ProjectApiService } from './project-api.service';
import { NotificationsService } from '../../core/notification/notifications.service';


@Injectable()
export class ProjectService {

  projects: any = [];
  selectedProject: any;

  get projectList() {
    return this.projects;
  }

  constructor(private api: ProjectApiService,private notifications:NotificationsService) { }

  fetchProjects() {
    return this.api.getProjects()
      .then((list) => this.projects = list);
  }

  save(project) {

    let isEditMode = (project) => { return project.id != null };

    let refreshProject = (project) => {
      let projectItmeIndex = this.projects.findIndex((item) => item.id === project.id);
      if (projectItmeIndex === -1) return;
      Object.assign(this.projects[projectItmeIndex], project);
      return;
    };

    let pushProject = (savedProject) => {
      this.notifications.addNotification('hey','success',5000);
      return this.projects.push(savedProject);
    };

    if (isEditMode(project))
      return this.api.putProject(project).
        then(refreshProject.bind(this, project));

    return this.api.postProject(project)
      .then(pushProject);


  }


}
