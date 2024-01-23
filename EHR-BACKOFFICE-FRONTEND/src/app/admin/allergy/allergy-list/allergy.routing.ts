import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllergyListComponent } from './allergy-list.component';

const routes: Routes = [
  {
    path: 'allergy-list',
    component: AllergyListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllergyRoutingModule {}
