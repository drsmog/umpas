import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {


  @Input() currentProjectItem: any;

  private projectItem: any = {};

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  onSave() {
    this.projectService.save(this.currentProjectItem);

  }


}
