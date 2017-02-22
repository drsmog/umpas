import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {


  @Input() currentProjectItem: any;

  @Output() save = new EventEmitter();

  private projectItem: any = {};

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
  }

  onSave() {
    this.save.emit(this.currentProjectItem);
  }


}
