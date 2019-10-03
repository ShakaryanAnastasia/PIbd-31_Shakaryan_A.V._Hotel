import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsComponent } from './rooms.component';

export const ROUTES: Routes = [
    { path: '', component: RoomsComponent, pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    declarations: [RoomsComponent]
})
export class RoomsModule { }