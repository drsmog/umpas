import { Injectable } from '@angular/core';
import { RoleApiService } from './role-api.service';

@Injectable()
export class RoleService {
  roles: any = [];
  selectedRole: any;
  selectedRoleActions: any=[];

  constructor(private api: RoleApiService) { }

  fetchRoles() {
    return this.api.getRoles()
      .then((list) => this.roles = list);
  }

  save(role) {

    let isEditMode = (role) => (role.id != null);

    let pushRole = (role) => {
      this.roles.push(role)
     };

    let refreshRole = (role) => {
      let roleIndex = this.roles.findIndex((item) => item.id === role.id);
      if (roleIndex === -1) return;
      Object.assign(this.roles[roleIndex], role);
    };

    if (isEditMode(role)) {
      return this.api.putRole(role).then(refreshRole.bind(this, role));
    }
    return this.api.postRole(role).then(pushRole);

  }




}
