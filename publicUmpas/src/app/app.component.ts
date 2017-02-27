import { Component } from '@angular/core';
import { ProjectService } from './project/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private projectService: ProjectService) {
  }

  get selectedProject() {
    return this.projectService.selectedProject;
  }

  onProjectSave(event){
    this.projectService.save(event);
  }




}
