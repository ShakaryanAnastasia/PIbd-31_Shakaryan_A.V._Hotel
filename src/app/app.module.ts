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
import { UserService } from './user.service';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CookieService } from 'ngx-cookie-service'

import { RoomsComponent } from './rooms/rooms.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AddComponent } from './admin/add/add.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { isAuthorized } from './isAuthorized';
import { InfoComponent } from './info/info.component';
import { authService } from './authService';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    AddComponent,
    RoomsComponent,
    LoginComponent,
    RegistrationComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule, 
    CKEditorModule
  ],
  providers: [MessageService, HttpErrorHandler, RoomsService, UserService, CookieService, isAuthorized, authService],
  bootstrap: [AppComponent]
})
export class AppModule { }
