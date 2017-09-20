import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryDataService } from './in-memory-data.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AlertModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

// pipes
import { NameFilterPipe } from './core/pipe/name-filter.pipe';


// shared service
import { NotificationsService } from './core/notification/notifications.service';
import { HandlerService } from './core/handler/handler.service';

// shared core components

import { NotificationComponent } from './core/notification/notification.component';

import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectService } from './project/service/project.service';
import { ProjectApiService } from './project/service/project-api.service';

import { RoleComponent } from './role/role.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleDetailsComponent } from './role/role-details/role-details.component';
import { RoleService } from './role/service/role.service';
import { RoleApiService } from './role/service/role-api.service';


import { ActionComponent } from './role/action/action.component';
import { ActionListComponent } from './role/action/action-list/action-list.component';
import { ActionDetailsComponent } from './role/action/action-details/action-details.component';
import { ActionService } from './role/action/service/action.service';
import { ActionApiService } from './role/action/service/action-api.service';

import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserService } from './user/service/user.service';
import { UserApiService } from './user/service/user-api.service';
import { UserDetailsComponent } from './user/user-details/user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailsComponent,
    NotificationComponent,
    ProjectListComponent,
    RoleComponent,
    RoleListComponent,
    RoleDetailsComponent,
    ProjectComponent,
    NameFilterPipe,
    ActionComponent,
    ActionListComponent,
    ActionDetailsComponent,
    UserComponent,
    UserListComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()

  ],
  providers: [
    ProjectService,
    ProjectApiService,
    RoleService,
    RoleApiService,
    NotificationsService,
    HandlerService,
    ActionApiService,
    ActionService,
    UserService,
    UserApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
