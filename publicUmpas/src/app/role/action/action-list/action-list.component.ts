import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActionService } from '../service/action.service';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {

  @ViewChild('actionModal') public actionModal: ModalDirective;
  newAction: any = {};

  constructor(private actionService: ActionService) { }

  ngOnInit() {

  }

  onRemoveAction(event, action) {
    this.actionService.removeActionOfRole(action);
    event.stopPropagation();
  }

  onSaved() {
    this.newAction = {};
    this.actionModal.hide();
  }

}
