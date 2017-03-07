import { Component, OnInit, Input } from '@angular/core';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {

  @Input() currentRole:any;


  constructor(private roleService:RoleService) { }

  ngOnInit() {
  }

  onSave(){
    this.roleService.save(this.currentRole);
  }



}
