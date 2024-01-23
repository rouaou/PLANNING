import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymptomsAddEditComponent } from './symptoms-add-edit.component';

const routes: Routes = [
  {
    path: "symptoms-add-edit",
    component: SymptomsAddEditComponent,
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SymptomsRoutingComponent {

}
