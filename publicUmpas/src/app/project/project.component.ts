import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from './service/project.service';

import { ProjectListComponent } from './project-list/project-list.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild(ProjectListComponent) listComponent;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  get selectedProject() {
    return this.projectService.selectedProject;
  }

  onClone() {
    this.listComponent.onCloneToggle();
  }

}
