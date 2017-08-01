import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnChanges {

  @Input() currentUser: any;
  @Output() passwordReset = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: any) {
    this.userService.mergeUserRoleList();
  }

  onSave() {

    this.currentUser.roles = this.userService.roleList.filter(
      role => role.checked
    ).map(
      role => role.name
      );

    this.userService.update(this.currentUser);
  }

  resetPassword() {
    this.userService.resetPassword(this.currentUser)
      .then(password => {
        this.passwordReset.emit(password);
      });
  }

}
