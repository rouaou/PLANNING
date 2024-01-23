import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanningComponent } from './planning.component';
import { PLanningRoutingModule } from './planning-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';


@NgModule({
  declarations:[PlanningComponent],
  imports: [
    CommonModule,
    FormsModule,
    PLanningRoutingModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],

})
export class PlanningModule {}
