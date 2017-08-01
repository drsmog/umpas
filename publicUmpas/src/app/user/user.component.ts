import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './service/user.service';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild(UserListComponent) userList;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onPasswordReset(password) {
    this.userList.showPasswordModal(password);
  }

}
