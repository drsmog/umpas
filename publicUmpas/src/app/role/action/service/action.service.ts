import { Injectable } from '@angular/core';
import { ActionApiService } from './action-api.service';
import { ProjectService } from '../../../project/service/project.service';


@Injectable()
export class ActionService {

  actions: any = [];

  constructor(private api: ActionApiService, private projectService: ProjectService) { }

  fetchActions(roleName) {
    return this.api.getActions(this.projectService.selectedProjectId, roleName)
      .then((list) => this.actions = list);
  }

  removeActionOfRole(action) {
    this.api.deleteAction(this.projectService.selectedProjectId, action.roleName, action.id)
      .then((result) => {
        let index = this.actions.findIndex((item) => item.id === action.id);
        this.actions.splice(index, 1);
        this.actions = this.actions.slice();
      })
      .catch(this.projectService.handleError.bind(this.projectService));
  }

  save(action, role) {

    action.roleName = role.name;

    let isEditMode = (item) => (!!item.id);
    let pushAction = (item) => (this.actions.push(item));
    let refreshAction = (item) => {
      let index = this.actions.findIndex((t) => t.id === item.id);
      if (index === -1) {
        return;
      }
      Object.assign(this.actions[index], item);
      return this.actions[index];
    };

    if (!isEditMode(action)) {
      return this.api.postAction(this.projectService.selectedProjectId, action, role.name).then(pushAction)
        .catch(this.projectService.handleError.bind(this.projectService));
    }

    return this.api.putAction(this.projectService.selectedProjectId, action, role.name).then(refreshAction.bind(this, action))
      .catch(this.projectService.handleError.bind(this.projectService));
  }

}
