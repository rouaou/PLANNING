import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseaseCodeListComponent } from './disease-code-list.component';


const routes: Routes = [
  {
    path: 'disease-code-list',
    component: DiseaseCodeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiseaseCodeRoutingModule {}
