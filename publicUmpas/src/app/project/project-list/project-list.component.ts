import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Output() onProjectSelect = new EventEmitter();

  //projects: any = [];
  newProject: any = {};


  get selectedProject() {
    return this.projectService.selectedProject;
  }

  set selectedProject(value) {
    Object.assign(this.projectService.selectedProject, value);
  }

  get projects(){
    return this.projectService.projects;
  }

  constructor(private projectService: ProjectService) { }


  ngOnInit() {
    this.projectService.loadProjectList();

  }

  onSelect(project) {

    this.projectService.selectedProject = Object.assign({}, project);
    this.onProjectSelect.emit(this.projectService.selectedProject);

  }

  onSave(project) {
    this.projectService.save(project);

  }




}
