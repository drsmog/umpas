import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() projectItem;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  get selectedProject() {
    return this.projectService.selectedProject;
  }
  get isSelected(){
    if(!this.selectedProject) return  false;
    return (this.projectService.selectedProject.id === this.projectItem.id)
  }

}
