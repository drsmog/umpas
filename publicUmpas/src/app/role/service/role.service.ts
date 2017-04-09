import { Injectable } from '@angular/core';
import { RoleApiService } from './role-api.service';

@Injectable()
export class RoleService {
    roles: any = [];
    selectedRole: any;
    selectedRoleActions: any = [];

    constructor(private api: RoleApiService) { }

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
            return this.api.putRole(role).then(refreshRole.bind(this, role));
        }
        return this.api.postRole(role).then(pushRole);

    }

    removeRole(role) {
        return this.api.deleteRole(role).then(() => {
            let index = this.roles.findIndex((item) => item.id === role.id);
            if (index === -1) { return; }
            this.roles.splice(index, 1);
            this.roles = this.roles.slice();
            this.selectedRole = null;
        });
    }




}
