import { Injectable } from '@angular/core';
import { ActionApiService } from './action-api.service';


@Injectable()
export class ActionService {

  actions: any = [];

  constructor(private api: ActionApiService) { }

  fetchActions(roleId) {
    return this.api.getActions(roleId)
      .then((list) => this.actions = list);
  }

  removeActionOfRole(action) {
    this.api.deleteAction(action.roleId, action.id)
      .then((result) => {
        let index = this.actions.findIndex((item) => item.id === action.id);
        this.actions.splice(index, 1);
        this.actions = this.actions.slice();
      });
  }

  save(action, role) {
    let isEditMode = (action) => (!!action.id);
    let pushAction = (action) => (this.actions.push(action));
    let refreshAction = (action) => {
      let index = this.actions.findIndex((item) => item.id === action.id);
      if (index === -1) return;
      Object.assign(this.actions[index], action);
      return this.actions[index];
    };

    if (!isEditMode(action))
      return this.api.postAction(action, role.id).then(pushAction);

    return this.api.putAction(action, role.id).then(refreshAction.bind(this,action));
  }

}
