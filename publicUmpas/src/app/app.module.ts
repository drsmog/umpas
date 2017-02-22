import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//shared service
import { NotificationsService} from './core/notification/notifications.service';

//shared core components
import { ModalComponent } from './core/modal/modal.component';
import { NotificationComponent } from './core/notification/notification.component';


import { AppComponent } from './app.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectService } from './project/project.service';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectItemComponent } from './project/project-item/project-item.component';



@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ProjectDetailsComponent,
    NotificationComponent,
    ProjectListComponent,
    ProjectItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProjectService,NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
