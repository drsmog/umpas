import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  constructor(private roleService:RoleService) { }

  ngOnInit() {
  }

}
