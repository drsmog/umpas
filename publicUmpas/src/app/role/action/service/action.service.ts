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

}
