import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ApointmentAdminListComponent } from './apointment-admin-list.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { AddAppointmentComponent } from './Dialog/add-appointment/add-appointment.component';
@NgModule({
  declarations: [
    ApointmentAdminListComponent,
    AddAppointmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ComponentsModule,
    SharedModule,
    MatPaginatorModule,
    NgxPaginationModule,
  ],
 // providers: [],
})
export class AppointmentAdminModule {}
