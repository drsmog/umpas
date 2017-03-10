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
      description: 'გააჩნიათ დათვარიელების უფლება',

    }, {

        id: 2,
        name: 'ოპერატორი',
        description: 'გააჩნიათ ინფორმაციის შეყვანის უფლება',

      }, {
        id: 3,
        name: 'ინსპექტირება',
        description: 'მხოლოდ სტატისტიკა',

      }, {
        id: 4,
        name: 'ადმინისტრატორი',
        description: 'ადმინისტრირების ფუნქციონალი ყველაფერთან ერთად',

      }, {
        id: 5,
        name: 'პროვაიდერი',
        description: 'წყარო',

      }];

    let actions = [{
      roleId: 5,
      id: 1,
      pattern: "/api/contracts/*",
      name: "contracts",
      verbDelete: false,
      verbPost: true,
      verbPut: false,
      verbGet: true
    }, {
        roleId: 5,
        id: 2,
        pattern: "/api/vouchers/sync/*",
        name: "vouchers",
        verbDelete: false,
        verbPost: false,
        verbPut: false,
        verbGet: true
      }, {
        roleId: 5,
        id: 3,
        pattern: "/api/users/fullname/*",
        name: "users",
        verbDelete: false,
        verbPost: false,
        verbPut: false,
        verbGet: true
      }, {
        roleId: 5,
        id: 4,
        pattern: "/api/visits/*",
        name: "visits",
        verbDelete: false,
        verbPost: true,
        verbPut: true,
        verbGet: true
      }, {
        roleId: 5,
        id: 5,
        pattern: "/um/resetpass/*",
        name: "um",
        verbDelete: false,
        verbPost: true,
        verbPut: false,
        verbGet: false
      }, {
        roleId: 4,
        id: 6,
        pattern: "/api/components/*",
        name: "components",
        verbDelete: false,
        verbPost: false,
        verbPut: false,
        verbGet: true
      }, {
        roleId: 4,
        id: 7,
        pattern: "/api/utils/loggedin/*",
        name: "login",
        verbDelete: false,
        verbPost: false,
        verbPut: true,
        verbGet: false
      }, {
        roleId: 4,
        id: 8,
        pattern: "/api/utils/loggedout/*",
        name: "logout",
        verbDelete: false,
        verbPost: false,
        verbPut: true,
        verbGet: false
      }];



    return { projects, roles, actions };
  }

}
