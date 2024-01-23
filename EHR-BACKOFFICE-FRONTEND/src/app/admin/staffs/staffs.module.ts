import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { StaffsRoutingModule } from './staffs-routing.module';
import { StaffsListComponent } from './staffs-list/staffs-list.component';
import { FormStaffDialogComponent } from './dialog/formStaff-dialog/form-dialog.component';
import { DeleteComponent } from './dialog/delete/delete.component';
import { EditStaffComponent } from './dialog/edit-staff/edit-staff.component';
//import { StaffService } from '../staff/allstaff/staff.service';
@NgModule({
  declarations: [
StaffsListComponent,
FormStaffDialogComponent,
DeleteComponent,
EditStaffComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StaffsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  //providers: [StaffService],
})
export class StaffsModule {}
