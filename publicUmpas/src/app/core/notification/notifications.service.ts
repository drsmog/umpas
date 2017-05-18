import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {

  notifications: any = [];

  constructor() { }

  addNotification(notificationText: string, type:string='success', timeOut?: number) {

    let notification = {
      id: new Date().getTime().toString() + this.notifications.length.toString(),
      message: notificationText + ' ' + this.notifications.length.toString(),
      type: `alert-${type}`
    };

    this.notifications.unshift(notification);

    if (timeOut) {
      let autoClose = this.closeNotificationById.bind(this, notification.id);
      setTimeout(autoClose, timeOut);
    }

  }

  closeNotification(i) {
    if (!this.notifications || this.notifications.length === 0) return;
    this.notifications.splice(i, 1);

  }

  closeNotificationById(id) {

    for (let i = 0; i < this.notifications.length; i++) {
      if (this.notifications[i].id === id) {
        this.notifications.splice(i, 1);
        break;
      }

    }

  }



}
