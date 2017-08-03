import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() currentProjectItem: any;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  private projectItem: any = {};

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  onSave() {
    this.projectService.save(this.currentProjectItem)
      .then((project) => this.saved.emit(project));

  }

  onInitialize() {
    if (this.currentProjectItem.id) {
      this.projectService.initializeExistingProject(this.currentProjectItem);

      return;
    }

    this.projectService.initialize(this.currentProjectItem);
  }


}
