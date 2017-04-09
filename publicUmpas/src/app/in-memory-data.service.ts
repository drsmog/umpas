import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable()
export class InMemoryDataService implements InMemoryDbService {

    constructor() { }

    createDb() {
        let projects = [
            { id: 1, name: 'project 1 - change', description: 'desc 1' },
            { id: 2, name: 'project 2 - change', description: 'desc 2' },
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
            pattern: '/api/contracts/*',
            name: 'contracts',
            verbDelete: false,
            verbPost: true,
            verbPut: false,
            verbGet: true
        }, {
                roleId: 5,
                id: 2,
                pattern: '/api/vouchers/sync/*',
                name: 'vouchers',
                verbDelete: false,
                verbPost: false,
                verbPut: false,
                verbGet: true
            }, {
                roleId: 5,
                id: 3,
                pattern: '/api/users/fullname/*',
                name: 'users',
                verbDelete: false,
                verbPost: false,
                verbPut: false,
                verbGet: true
            }, {
                roleId: 5,
                id: 4,
                pattern: '/api/visits/*',
                name: 'visits',
                verbDelete: false,
                verbPost: true,
                verbPut: true,
                verbGet: true
            }, {
                roleId: 5,
                id: 5,
                pattern: '/um/resetpass/*',
                name: 'um',
                verbDelete: false,
                verbPost: true,
                verbPut: false,
                verbGet: false
            }, {
                roleId: 4,
                id: 6,
                pattern: '/api/components/*',
                name: 'components',
                verbDelete: false,
                verbPost: false,
                verbPut: false,
                verbGet: true
            }, {
                roleId: 4,
                id: 7,
                pattern: '/api/utils/loggedin/*',
                name: 'login',
                verbDelete: false,
                verbPost: false,
                verbPut: true,
                verbGet: false
            }, {
                roleId: 4,
                id: 8,
                pattern: '/api/utils/loggedout/*',
                name: 'logout',
                verbDelete: false,
                verbPost: false,
                verbPut: true,
                verbGet: false
            }];


        let users = [
            {
                id: 1,
                userName: 'user1',
                password: 'f3ba963e2e1798c026d35656500509df3d61b6140d33c2be3dd932605849e43f',
                firstName: 'user1',
                lastName: 'user1',
                email: 'user1',
                phone: 'user1',
                address: 'user1',
                additionalInfo: 'user1',
                isActivated: true,
                roles: ['provider', 'superadmin'],
                metaData: {
                    regionid: 'MetaRegionId_1',
                    districtid: 'MetaDistrictId_1',
                    providerId: 'MetaProviderId_1'
                }
            }, {
                id: 2,
                userName: 'user2',
                password: 'f3ba963e2e2798c026d35656500509df3d62b6240d33c2be3dd932605849e43f',
                firstName: 'user2',
                lastName: 'user2',
                email: 'user2',
                phone: 'user2',
                address: 'user2',
                additionalInfo: 'user2',
                isActivated: true,
                roles: ['provider', 'superadmin'],
                metaData: {
                    regionid: 'MetaRegionId_2',
                    districtid: 'MetaDistrictId_2',
                    providerId: 'MetaProviderId_2'
                }
            }, {
                id: 3,
                userName: 'user3',
                password: 'f3ba963e2e3798c026d35656500509df3d63b6340d33c2be3dd932605849e43f',
                firstName: 'user3',
                lastName: 'user3',
                email: 'user3',
                phone: 'user3',
                address: 'user3',
                additionalInfo: 'user3',
                isActivated: true,
                roles: ['provider', 'superadmin', 'მომხმარებელი'],
                metaData: {
                    regionid: 'MetaRegionId_3',
                    districtid: 'MetaDistrictId_3',
                    providerId: 'MetaProviderId_3'
                }
            }
        ];



        return { projects, roles, actions, users };
    }

}
