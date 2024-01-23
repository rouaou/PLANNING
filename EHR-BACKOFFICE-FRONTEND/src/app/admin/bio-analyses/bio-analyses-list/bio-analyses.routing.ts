import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioAnalysesListComponent } from './bio-analyses-list.component';

const routes: Routes = [
  {
    path: 'bio-analyses-list',
    component: BioAnalysesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BioAnalysesRoutingModule {}
