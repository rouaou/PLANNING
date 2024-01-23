
import { Routes, RouterModule } from "@angular/router";

import { Page404Component } from "./../../authentication/page404/page404.component";
import { StaffsListComponent } from "./staffs-list/staffs-list.component";
import { NgModule } from "@angular/core";
const routes: Routes = [
  {
    path: "all-staffs",
    component: StaffsListComponent,

  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffsRoutingModule {}
