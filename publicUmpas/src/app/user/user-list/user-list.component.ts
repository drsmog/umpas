import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild('userModal') userModal;
  @ViewChild('passwordModal') passwordModal;
  userToAdd: any = {};
  firstPassword: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.fetchUsers()
      .then(() => console.log(this.userService.users));
  }

  isSelected(user) {

    if (!this.userService.selectedUser) {
      return false;
    }
    return this.userService.selectedUser.id === user.id;
  }

  onSelect(user) {
    this.userService.selectedUser = Object.assign({}, user);
  }

  onRemoveUser(event, user) {

    this.userService.removeUser(user);

    event.stopPropagation();

  }

  getUserNameField(item: any): string {
    return item.userName;
  }

  onSave() {
    this.userService.registerInactiveUser(this.userToAdd)
      .then(password => {
        this.userToAdd = {};
        this.userModal.hide();

        this.firstPassword = password;

        this.passwordModal.show();
      });
  }

  copy() {
    let success = document.execCommand('copy');

    console.log(success);
  }

  onDone() {
    this.firstPassword = null;

    this.passwordModal.hide();
  }

}
