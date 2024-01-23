import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
//import { Page404Component } from '../authentication/page404/page404.component';
import { CalendarComponent } from './calendar.component';

const routes: Routes = [
  {
    path: 'calendar/:userky',
    component: CalendarComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
