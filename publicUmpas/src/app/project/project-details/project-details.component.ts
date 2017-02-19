import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() currentProjectItem:any;

  @Output() save = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSave(){
    this.save.emit(this.currentProjectItem);
  }


}
