
import { Routes, RouterModule } from "@angular/router";

import { Page404Component } from "./../../authentication/page404/page404.component";

import { NgModule } from "@angular/core";
import { StaffGroupListComponent } from "./staff-group-list/staff-group-list.component";
const routes: Routes = [
  {
    path: "all-staffGroup",
    component: StaffGroupListComponent,

  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffGroupRoutingModule {}
