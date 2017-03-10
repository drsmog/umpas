import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-action-details',
  templateUrl: './action-details.component.html',
  styleUrls: ['./action-details.component.css']
})
export class ActionDetailsComponent implements OnInit {

  @Input() currentAction:any;

  constructor() { }

  ngOnInit() {
  }

}
