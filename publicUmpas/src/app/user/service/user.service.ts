import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { RoleService } from '../../role/service/role.service';
import { ProjectService } from '../../project/service/project.service';

import { NotificationsService } from '../../core/notification/notifications.service';

@Injectable()
export class UserService {

  users: any = [];
  selectedUser: any;
  roleList: any;
  timeOutMilliseconds = 4000;

  constructor(
    private api: UserApiService,
    private roleService: RoleService,
    private notificationService: NotificationsService,
    private projectService: ProjectService
  ) { }

  fetchUsers() {
    return this.api.getUsers(this.projectService.selectedProjectId)
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

  update(user) {
    const refreshUser = userItem => {
      let index = this.users.findIndex(item => item.id === user.id);

      if (index === -1) return;

      Object.assign(this.users[index], user);
    };

    return this.api.updateUser(this.projectService.selectedProjectId, user)
      .then(() => {
        refreshUser(user);

        this.mergeUserRoleList();
      })
      .then(() => {
        this.notificationService.addNotification('user updated', 'success', this.timeOutMilliseconds);
      });
  }

  removeUser(user) {
    return this.api.removeUser(this.projectService.selectedProjectId, user)
      .then(() => {
        let index = this.users.findIndex(item => item.id === user.id);
        if (index === -1) { return; }

        this.users.splice(index, 1);
        this.selectedUser = null;
      })
      .then(() => {
        this.notificationService.addNotification('user removed', 'success', this.timeOutMilliseconds);
      });
  }

  registerInactiveUser(user) {
    return this.api.registerUser(this.projectService.selectedProjectId, user)
      .then(password => {
        return this.fetchUsers()
          .then(() => {
            return password;
          });
      })
      .then(password => {
        this.notificationService.addNotification('user registered', 'success', this.timeOutMilliseconds);

        return password;
      });
  }
}
