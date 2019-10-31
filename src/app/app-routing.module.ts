import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './StartComponent/app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AddComponent } from './admin/add/add.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'admin',  component: AdminComponent },
  { path: 'admin/add',  component: AddComponent },
  { path: 'admin/edit/:id', component: AddComponent , data:{mode:"edit"}},
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegistrationComponent }, 
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  //{ path: 'rooms',  loadChildren: './rooms/rooms.module#RoomsModule' },
  { path: 'rooms',  component: RoomsComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
