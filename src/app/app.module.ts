import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './StartComponent/app.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import {RoomsService} from './admin/room.service'

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { RoomsComponent } from './rooms/rooms.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AddComponent } from './admin/add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    AddComponent,
    RoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule, 
    CKEditorModule
  ],
  providers: [MessageService, HttpErrorHandler, RoomsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
