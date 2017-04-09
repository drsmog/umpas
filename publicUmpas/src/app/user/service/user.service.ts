import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { RoleService } from '../../role/service/role.service';

@Injectable()
export class UserService {

    users: any = [];
    selectedUser: any;
    roleList: any;

    constructor(private api: UserApiService, private roleService: RoleService) { }

    fetchUsers() {
        return this.api.getUsers()
            .then((list) => this.users = list);
    }

    getRoles() {
        return this.roleService.roles.map((role) => {
            return {
                name: role.name,
                checked: false
            };
        });
    }

    mergeUserRoleList() {
      if (!this.roleList) {  // init role list if need
          this.roleList = this.getRoles();
      }
      // clear checkboxes ))
      this.roleList.forEach((item) => item.checked = false);

      // merge with user roles
      this.selectedUser.roles.forEach((userRole) => {
          let index = this.roleList.findIndex((role) => role.name === userRole);
          if (index === -1) {
              return;
          }
          this.roleList[index].checked = true;

      });
    }
}
