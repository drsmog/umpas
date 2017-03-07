import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  newProject: any = {};

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.fetchProjects();
  }

  onSelect(project) {
    this.projectService.selectedProject = Object.assign({}, project);

  }

  onSave(project) {
    this.projectService.save(project);
  }

  isSelected(project) {
    if (!this.projectService.selectedProject) return false;
    return this.projectService.selectedProject.id === project.id;
  }




}
