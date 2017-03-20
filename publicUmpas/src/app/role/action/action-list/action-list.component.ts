import { Component, OnInit } from '@angular/core';
import { ActionService } from '../service/action.service';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {

  newAction: any={};

  constructor(private actionService: ActionService) { }

  ngOnInit() {

  }

  onRemoveAction(event, action) {
    this.actionService.removeActionOfRole(action);
    event.stopPropagation();
  }

}
