import { Component, OnInit, Input } from '@angular/core';
import { ActionService } from '../service/action.service';
import { RoleService } from '../../service/role.service';

@Component({
  selector: 'app-action-details',
  templateUrl: './action-details.component.html',
  styleUrls: ['./action-details.component.css']
})
export class ActionDetailsComponent implements OnInit {

  @Input() currentAction: any;

  constructor(private actionService: ActionService, private roleService: RoleService) { }

  ngOnInit() {
  }

  onSave() {
    this.actionService.save(this.currentAction, this.roleService.selectedRole)
      .then((res) => console.log(res));
  }

}
