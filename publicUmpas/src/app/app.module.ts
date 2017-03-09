import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryDataService } from './in-memory-data.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AlertModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { AccordionModule } from 'ng2-bootstrap/accordion';



//shared service
import { NotificationsService} from './core/notification/notifications.service';

//shared core components
import { ModalComponent } from './core/modal/modal.component';
import { NotificationComponent } from './core/notification/notification.component';


import { AppComponent } from './app.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectService } from './project/service/project.service';
import { ProjectApiService } from './project/service/project-api.service';

import { RoleComponent } from './role/role.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleService } from './role/service/role.service';
import { RoleApiService } from './role/service/role-api.service';
import { RoleDetailsComponent } from './role/role-details/role-details.component';
import { ProjectComponent } from './project/project.component';
import { NameFilterPipe } from './core/pipe/name-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ProjectDetailsComponent,
    NotificationComponent,
    ProjectListComponent,
    RoleComponent,
    RoleListComponent,
    RoleDetailsComponent,
    ProjectComponent,
    NameFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot()

  ],
  providers: [ProjectService, ProjectApiService, RoleService, RoleApiService, NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
