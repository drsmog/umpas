import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let projects = [
      { id: 1, name: 'project 1', description: 'desc 1' },
      { id: 2, name: 'project 2', description: 'desc 2' },
      { id: 3, name: 'project 3', description: 'desc 3' },
      { id: 4, name: 'project 4', description: 'desc 4' },
      { id: 5, name: 'project 5', description: 'desc 5' }

    ];

    let roles = [{
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

    return { projects,roles };
  }

}
