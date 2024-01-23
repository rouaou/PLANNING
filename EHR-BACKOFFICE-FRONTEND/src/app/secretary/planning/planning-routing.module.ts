
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Calendar } from "./calendar/calendar.model";

const routes: Routes = [
  {
    path: 'workPlanCalendar/:userKy',
    component: Calendar,
  },

  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PLanningRoutingModule { }
