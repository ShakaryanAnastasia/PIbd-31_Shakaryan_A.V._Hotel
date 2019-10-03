import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './StartComponent/app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'rooms',  component: RoomsComponent },
  { path: 'home',  component: HomeComponent },
	{path: '', redirectTo: '/home', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
