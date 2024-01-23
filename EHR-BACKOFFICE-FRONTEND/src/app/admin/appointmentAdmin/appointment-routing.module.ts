import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { ApointmentAdminListComponent } from "./apointment-admin-list.component";
const routes: Routes = [
  {
    path: "all-appointment",
    component: ApointmentAdminListComponent,
  },

  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule {}
