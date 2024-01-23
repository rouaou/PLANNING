import { Routes, RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";
import { EquipmentComponent } from "./equipment.component";
import { Page404Component } from "app/authentication/page404/page404.component";
const routes: Routes = [
  {
    path: "Equipments",
    component: EquipmentComponent,

  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class equipmentRoutingModule {}
