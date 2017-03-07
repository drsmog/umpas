import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  newRole:any={};

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    this.roleService.fetchRoles();
  }

  onSelect(role) {
    this.roleService.selectedRole = Object.assign({}, role);
  }

  isSelected(role) {
    if(!this.roleService.selectedRole) return false;
    return this.roleService.selectedRole.id === role.id;
  }

}
