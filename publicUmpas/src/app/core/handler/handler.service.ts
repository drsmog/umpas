import { Injectable } from '@angular/core';
import { ProjectService } from '../../project/service/project.service';
import { NotificationsService } from '../notification/notifications.service';

@Injectable()
export class HandlerService {
  timeOutMilliseconds = 4000;

  constructor(private notificationService: NotificationsService, private projectService: ProjectService) { }

  handleError(error) {
    if (error.status === 400) {
      this.notificationService.addNotification(error.json().message, 'warning', this.timeOutMilliseconds);

      throw error;
    }

    if (error.status === 401) {
      this.projectService.relogin();

      this.notificationService.addNotification(error.json().message, 'warning', this.timeOutMilliseconds);

      throw error;
    }
  }
}
