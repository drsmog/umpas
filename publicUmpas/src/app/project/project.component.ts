import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  projects = [
    { id: 1, name: 'dayCenter', description: 'baby care organizations' },
    { id: 2, name: 'high mountine', description: 'Benefits for village doctors' },
    { id: 3, name: 'Help Desk', description: 'ehealth internal helpdesk system' },

  ];
  selectedProjectItem: any;
  newProjectItem: any = {};

  constructor() { }

  ngOnInit() {
  }

  onProjectItemClick(project) {
    this.selectedProjectItem = project;

  }

  onSaveNewProject(project) {
    if(project.id) return ;
    project.id = this.projects.length+1;
    this.projects.push(project);
    this.newProjectItem={};
    // console.log(event);
    // console.log(this.newProjectItem);
  }

}
