import { Injectable } from '@angular/core';

@Injectable()
export class RoleService {

  selectedRole:any;

  constructor() { }

  roles: any = [
    {
      id: 1,
      name: 'მომხმარებელი',
      description: 'გააჩნიათ დათვარიელების უფლება'
    }, {
      id: 2,
      name: 'ოპერატორი',
      description: 'გააჩნიათ ინფორმაციის შეყვანის უფლება'
    }, {
      id: 3,
      name: 'ინსპექტირება',
      description: 'მხოლოდ სტატისტიკა'
    }, {
      id: 4,
      name: 'ადმინისტრატორი',
      description: 'ადმინისტრირების ფუნქციონალი ყველაფერთან ერთად'
    }, {
      id: 5,
      name: 'პროვაიდერი',
      description: 'წყარო'
    }];




}
