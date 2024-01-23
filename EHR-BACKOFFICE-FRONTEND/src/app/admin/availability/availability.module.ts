import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { AvailabilityRoutingModule } from './availability-routing.module';

@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AvailabilityRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class AvailabilityModule {}
