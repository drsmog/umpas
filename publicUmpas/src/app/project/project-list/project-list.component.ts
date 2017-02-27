import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.loadProjectList();
  }

  onSelect(project) {
    this.projectService.selectedProject = Object.assign({}, project);

  }

  onSave(project) {
    this.projectService.save(project);
  }




}
