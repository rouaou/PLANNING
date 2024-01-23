
import { Routes, RouterModule } from "@angular/router";

import { Page404Component } from "./../../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { PatientComponent } from "./patient.component";
const routes: Routes = [
  {
    path: "all-patient",
    component: PatientComponent,

  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
