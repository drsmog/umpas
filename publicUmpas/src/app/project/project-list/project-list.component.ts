import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Input() projects: any;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  get selectedProject() {
    return this.projectService.selectedProject;
  }

  get newProjectItem() {
    return this.projectService.newProjectItem;
  }

}
