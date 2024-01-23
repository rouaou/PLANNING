import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccListComponent } from './vacc-list.component';

const routes: Routes = [
  {
    path: 'vacc-list',
    component: VaccListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinationRoutingModule {}
