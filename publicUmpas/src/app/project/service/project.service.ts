import { Injectable } from '@angular/core';
import { ProjectApiService } from './project-api.service';

import { NotificationsService } from '../../core/notification/notifications.service';


@Injectable()
export class ProjectService {

  projects: any = [];
  selectedProject: any;
  timeOutMilliseconds = 4000;
  mustRelogin = true;

  get projectList() {
    return this.projects;
  }

  get selectedProjectId() {
    return this.selectedProject.id;
  }

  constructor(
    private api: ProjectApiService,
    private notificationService: NotificationsService
  ) { }

  fetchProjects() {
    return this.api.getProjects()
      .then((list) => this.projects = list);
  }

  private refreshProject(project) {
    let projectItemIndex = this.projects.findIndex((item) => item.id === project.id);

    if (projectItemIndex === -1) return;

    Object.assign(this.projects[projectItemIndex], project);

    if (this.projects[projectItemIndex].id === this.selectedProjectId) {
      Object.assign(this.selectedProject, this.projects[projectItemIndex]);
    }
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
        .then(this.notifySuccess.bind(this, 'project details updated successfully'))
        .catch(this.handleError.bind(this));
    }

    return this.api.postProject(project)
      .then(pushProject)
      .then(this.notifySuccess.bind(this, 'project added'))
      .catch(this.handleError.bind(this));

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
      .then(this.notifySuccess.bind(this, 'project successfully removed'))
      .catch(this.handleError.bind(this));

  }

  initialize(project) {
    return this.api.initializeProjectUm(project)
      .then(initializedProject => {
        Object.assign(project, initializedProject);

        return initializedProject;
      })
      .then(this.notifySuccess.bind(this, 'project initialized'))
      .catch(this.handleError.bind(this));
  }

  initializeExistingProject(project) {
    return this.api.initializeExistingProjectUm(project)
      .then(this.refreshProject.bind(this))
      .then(this.notifySuccess.bind(this, 'project initialized'))
      .catch(this.handleError.bind(this));
  }

  cloneProject(sourceProject, destinationProject) {
    return this.api.cloneProject(sourceProject, destinationProject)
      .then(credentials => {
        this.notifySuccess('project cloned');

        return credentials;
      })
      .catch(this.handleError.bind(this));
  }

  relogin() {
    return this.api.loginProject(this.selectedProject)
      .then(() => {this.mustRelogin = false; })
      .then(this.notifySuccess.bind(this, 'logged in project. please do last operation again.'))
      .catch(this.handleError.bind(this));
  }

  selectProject(project) {
    this.selectedProject = Object.assign({}, project);

    return this.api.selectProject(this.selectedProject)
      .catch(this.handleError.bind(this));
  }

  notifySuccess(message) {
    this.notificationService.addNotification(
      message,
      'success',
      this.timeOutMilliseconds
    );
  }

  handleError(error) {
    if (error.status === 400) {
      this.notificationService.addNotification(error.json().message, 'warning', this.timeOutMilliseconds);

      //throw error;
    }

    if (error.status === 401) {
      this.notificationService.addNotification(error.json().message, 'warning', this.timeOutMilliseconds);

      this.mustRelogin = true;

      //throw error;
    }
  }

}
