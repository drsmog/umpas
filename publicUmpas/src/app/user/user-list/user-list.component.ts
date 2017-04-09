import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

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
        console.log(this.userService.selectedUser);
    }

    onRemoveUser(event, user) {
        console.log('need remove', user);

    }

}
