import { Injectable } from '@angular/core';
import { ProjectApiService } from './project-api.service';

import { NotificationsService } from '../../core/notification/notifications.service';


@Injectable()
export class ProjectService {

  projects: any = [];
  selectedProject: any;
  timeOutMilliseconds = 4000;

  get projectList() {
    return this.projects;
  }

  constructor(private api: ProjectApiService, private notificationService: NotificationsService) { }

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
      this.projects.push(savedProject);
      return savedProject;
    };

    if (isEditMode(project)) {
      return this.api.putProject(project)
        .then(refreshProject.bind(this, project))
        .then(this.notifySuccess.bind(this, 'project details updated successfully'));
    }

    return this.api.postProject(project)
      .then(pushProject)
      .then(this.notifySuccess.bind(this, 'project added'))


  }

  removeProject(project) {
    return this.api.deleteProject(project)
      .then(() => {
        let index = this.projects.findIndex((item) => item.id === project.id);
        if (index === -1) return;
        this.projects.splice(index, 1);
        this.projects = this.projects.slice();
        this.selectedProject = null;
      })
      .then(this.notifySuccess.bind(this, 'project successfully removed'));

  }

  notifySuccess(message) {
    this.notificationService.addNotification(
      message,
      'success',
      this.timeOutMilliseconds
    );
  }

}
