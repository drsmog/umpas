import { Injectable } from '@angular/core';

@Injectable()
export class RoleService {

  constructor() { }

  roles: any = [
    {
      id: 1,
      name: 'მომხმარებელი',
      description: 'გააჩნიათ დათვარიელების უფლება'
    }, {
      id: 1,
      name: 'ოპერატორი',
      description: 'გააჩნიათ ინფორმაციის შეყვანის უფლება'
    }, {
      id: 1,
      name: 'ინსპექტირება',
      description: 'მხოლოდ სტატისტიკა'
    }, {
      id: 1,
      name: 'ადმინისტრატორი',
      description: 'ადმინისტრირების ფუნქციონალი ყველაფერთან ერთად'
    }, {
      id: 1,
      name: 'პროვაიდერი',
      description: 'წყარო'
    }];

}
