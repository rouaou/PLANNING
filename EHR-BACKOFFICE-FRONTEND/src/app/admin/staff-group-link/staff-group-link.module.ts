import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { StaffGroupLinkComponent } from './staff-group-link.component';
import { DeleteComponent } from './dialog/delete/delete.component';
import { FormComponent } from './dialog/form/form.component';
import { StaffGroupLinkRoutingModule } from './staff-group-link-routing.module';

//import { StaffService } from '../staff/allstaff/staff.service';
@NgModule({
  declarations: [
StaffGroupLinkComponent,
DeleteComponent,
FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StaffGroupLinkRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class StaffGroupLinkModule {}
