
import { Routes, RouterModule } from "@angular/router";

import { Page404Component } from "./../../authentication/page404/page404.component";

import { NgModule } from "@angular/core";
import { StaffGroupLinkComponent } from "./staff-group-link.component";
const routes: Routes = [
  {
    path: "all-staffGroupLink",
    component: StaffGroupLinkComponent,

  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffGroupLinkRoutingModule {}
