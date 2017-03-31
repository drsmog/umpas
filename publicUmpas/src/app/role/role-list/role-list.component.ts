import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';
import { ActionService } from '../action/service/action.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  newRole: any = {};

  constructor(private roleService: RoleService, private actionService: ActionService) { }

  ngOnInit() {
    this.roleService.fetchRoles();
  }

  onSelect(role) {
    this.roleService.selectedRole = Object.assign({}, role);
    this.actionService.fetchActions(role.id);

  }

  isSelected(role) {
    if (!this.roleService.selectedRole) {
      return false;
    }
    return this.roleService.selectedRole.id === role.id;
  }

  onSaved(role) {
    this.newRole = {};
  }

  onRemoveRole(event, role) {
    this.roleService.removeRole(role);
    event.stopPropagation();
  }

}
