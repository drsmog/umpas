import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProjectService } from '../service/project.service';

import { RoleService } from '../../role/service/role.service';
import { UserService } from '../../user/service/user.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @ViewChild('projectModal') public projectModal: ModalDirective;
  @ViewChild('cloneModal') public cloneModal: ModalDirective;
  @ViewChild('credentialsModal') public credentialsModal: ModalDirective;
  newProject: any = {};
  sourceProject: any;
  credentialsText: string;

  constructor(private projectService: ProjectService,
    private roleService: RoleService,
    private userService: UserService) { }

  ngOnInit() {
    this.projectService.fetchProjects();
  }

  onSelect(project) {
    this.projectService.selectedProject = Object.assign({}, project);

    this.roleService.fetchRoles();

    this.roleService.selectedRole = null;
    this.roleService.selectedRoleActions = [];

    this.userService.fetchUsers();

    this.userService.selectedUser = null;
  }

  isSelected(project) {
    if (!this.projectService.selectedProject) {
      return false;
    }
    return this.projectService.selectedProject.id === project.id;
  }

  onSaved(project) {
    this.newProject = {};
    this.projectModal.hide();
  }

  onRemoveProject(event, project) {
    this.projectService.removeProject(project);
    event.stopPropagation();
  }

  public onCloneToggle() {
    this.cloneModal.show();
  }

  onCloneSave() {
    this.cloneModal.hide();

    this.projectService.cloneProject(this.sourceProject, this.projectService.selectedProject)
      .then(credentials => {
        this.roleService.fetchRoles();

        this.userService.fetchUsers();

        this.credentialsText = this.credentialsToText(credentials);

        this.credentialsModal.show();
      });
  }

  get clonableProjects() {
    if (!this.projectService.selectedProject) {
      return this.projectService.projects;
    }

    return this.projectService.projects.filter(project => project.id !== this.projectService.selectedProject.id);
  }

  credentialsToText(credentials) {
    return credentials
      .map(credential => `${credential.userName}: ${credential.password}`)
      .reduce((text, credentialText) => {
        text += credentialText;
        text += '\n';

        return text;
      }, '');
  }


}
