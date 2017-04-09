import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnChanges {

    @Input() currentUser: any;

    constructor(private userService: UserService) { }

    ngOnInit() {

    }

    ngOnChanges(changes: any) {
      this.userService.mergeUserRoleList();
    }

}
