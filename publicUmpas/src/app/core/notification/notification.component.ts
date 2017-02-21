import { Component, OnInit } from '@angular/core';
import { NotificationsService} from './notifications.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {

  }

  get notifications() {
    return this.notificationsService.notifications;
  }

  onClose(i) {
    this.notificationsService.closeNotification(i);

  }

}
