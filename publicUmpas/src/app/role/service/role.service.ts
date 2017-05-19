import { Injectable } from '@angular/core';
import { RoleApiService } from './role-api.service';

import {NotificationsService} from '../../core/notification/notifications.service';

@Injectable()
export class RoleService {
    roles: any = [];
    selectedRole: any;
    selectedRoleActions: any = [];
    timeOutMilliseconds = 4000;

    constructor(private api: RoleApiService, private notificationService: NotificationsService) { }

    fetchRoles() {
        return this.api.getRoles()
            .then((list) => this.roles = list);
    }

    save(role) {

        let isEditMode = (item) => (item.id != null);

        let pushRole = (item) => {
            this.roles.push(item);
        };

        let refreshRole = (roleItem) => {
            let roleIndex = this.roles.findIndex((item) => item.id === roleItem.id);
            if (roleIndex === -1) { return; }
            Object.assign(this.roles[roleIndex], roleItem);
        };

        if (isEditMode(role)) {
            return this.api.putRole(role).then(refreshRole.bind(this, role))
              .then(this.notifySuccess.bind(this, 'role updated'));
        }
        return this.api.postRole(role).then(pushRole)
          .then(this.notifySuccess.bind(this, 'role created successfully'));

    }

    removeRole(role) {
        return this.api.deleteRole(role).then(() => {
            let index = this.roles.findIndex((item) => item.id === role.id);
            if (index === -1) { return; }
            this.roles.splice(index, 1);
            this.roles = this.roles.slice();
            this.selectedRole = null;
        })
        .then(this.notifySuccess.bind(this, 'role removed successfully'));
    }

    notifySuccess(message) {
      this.notificationService.addNotification(
        message,
        'success',
        this.timeOutMilliseconds
      );
    }




}
