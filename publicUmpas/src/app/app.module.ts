import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';


import { ModalComponent } from './core/modal/modal.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ModalComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
