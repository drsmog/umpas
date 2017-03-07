import { Component, OnInit } from '@angular/core';
import { ProjectService } from './service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
  }

  get selectedProject() {
    return this.projectService.selectedProject;
  }

}
