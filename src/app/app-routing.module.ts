import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './StartComponent/app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'rooms',  loadChildren: './rooms/rooms.module#RoomsModule' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
