import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { UserService } from "../../user/service/user.service";
import { RoleService } from "../../role/service/role.service";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() currentProjectItem: any;
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Output() clone: EventEmitter<any> = new EventEmitter();

  private projectItem: any = {};

  constructor(private projectService: ProjectService, private userService: UserService, private roleService: RoleService) { }

  ngOnInit() {
  }

  get mustRelogin() {
    return this.projectService.mustRelogin;
  }

  relogin() {
    this.projectService.relogin().then(() => {
      this.roleService.fetchRoles();

      this.roleService.selectedRole = null;
      this.roleService.selectedRoleActions = [];

      this.userService.fetchUsers();

      this.userService.selectedUser = null;
      console.log('refresh project');
    });


  }

  onSave() {
    this.projectService.save(this.currentProjectItem)
      .then((project) => this.saved.emit(project));

  }

  onInitialize() {
    if (this.currentProjectItem.id) {
      this.projectService.initializeExistingProject(this.currentProjectItem);

      return;
    }

    this.projectService.initialize(this.currentProjectItem);
  }

  onClone() {
    this.clone.emit();
  }


}
