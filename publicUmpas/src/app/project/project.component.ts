import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { NotificationsService } from '../core/notification/notifications.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  projects: any;
  selectedProjectItem: any;
  newProjectItem: any = {};
  beforeChangeProjectItem: any;

  constructor(
    private projectService: ProjectService,
    private notificationsService: NotificationsService
  )
  { }

  ngOnInit() {
    this.projectService.getProjectList().then(projects => {
      this.projects = projects;
    });
  }

  // onProjectItemClick(project) {
  //   this.undoChangesOnSwitch();
  //   this.selectedProjectItem = project;
  //   this.beforeChangeProjectItem = Object.assign({}, this.selectedProjectItem);
  //   this.notificationsService.addNotification('blablabla','success', 5000);
  //
  // }

  // undoChangesOnSwitch() {
  //
  //   if (this.selectedProjectItem &&
  //     this.beforeChangeProjectItem !== this.selectedProjectItem) {
  //
  //     Object.assign(this.selectedProjectItem, this.beforeChangeProjectItem)
  //
  //   }
  // }
  // approveChange(project) {
  //   Object.assign(this.beforeChangeProjectItem, project);
  // }
  //
  // onSaveProject(project) {
  //
  //   if (project.id) {
  //     this.editProject(project);
  //     return;
  //   }
  //
  //   this.addNewProject(project);
  // }
  //
  // addNewProject(project) {
  //   this.projectService.postProject(project)
  //     .then(result => {
  //       project.id = result.id
  //       this.projects.push(project);
  //       this.newProjectItem = {};
  //     });
  //
  // }
  //
  // editProject(project) {
  //   this.projectService.updateProject(project)
  //     .then(result => {
  //       this.approveChange(project);
  //       //TODO alert success
  //     });
  //
  // }

}
