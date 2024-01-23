
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { WorkAvailabilityComponent } from "./work-availability.component";
import { PlanningComponent } from "../planning/planning.component";

const routes: Routes = [
  {
    path: "all-availability",
    component: WorkAvailabilityComponent,

  },
  {
    path: 'planning/:userKy',
    component: PlanningComponent,
  },

  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailRoutingModule { }
