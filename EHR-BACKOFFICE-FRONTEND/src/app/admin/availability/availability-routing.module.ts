
import { Routes, RouterModule } from "@angular/router";

import { Page404Component } from "./../../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
const routes: Routes = [
  {
    path: "all-availability",


  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailabilityRoutingModule {}
