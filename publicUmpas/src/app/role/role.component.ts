import { Component, OnInit } from '@angular/core';
import { RoleService } from './service/role.service';
import { UserService } from '../user/service/user.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(private roleService: RoleService, private userService: UserService) { }

  ngOnInit() {
  }

  get roleUsers() {
    return this.userService.users.filter(item => item.roles.includes(this.roleService.selectedRole.name));
  }

}
