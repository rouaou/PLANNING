import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { DeleteComponent } from './dialog/delete/delete.component';
import { EditAvailComponent } from './dialog/edit-availability/edit-avail.component';
import { FormAvailDialogComponent } from './dialog/formAvailability-dialog/form-avail.component';
import { MatIconModule } from '@angular/material/icon';
import { WorkAvailabilityComponent } from './work-availability.component';
import { AvailRoutingModule } from './work-avail-routing.module';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

import { RouterModule, Routes } from '@angular/router';


@NgModule({


  declarations: [
FormAvailDialogComponent,
DeleteComponent,
EditAvailComponent,
WorkAvailabilityComponent,
  ],
  imports: [
    //RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    MatIconModule,
    ReactiveFormsModule,
    AvailRoutingModule,

      OwlDateTimeModule,
      OwlNativeDateTimeModule,

  ],
 // exports: [RouterModule],

  //providers: [StaffService],
})
export class AvailModule {}
