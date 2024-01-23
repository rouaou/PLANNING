import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { DeleteComponent } from './dialog/delete/delete.component';
import { StaffGroupListComponent } from './staff-group-list/staff-group-list.component';
import { EditComponent } from './dialog/edit/edit.component';
import { StaffGroupRoutingModule } from './staff-group-routing.module';
import { FormAddChilsComponent } from './dialog/formAddChild/form-AddChild.component';
import { StaffGroupChildComponent } from './staff-group-child/staff-group-child.component';
import { ColorPickerModule } from 'ngx-color-picker';

//import { StaffService } from '../staff/allstaff/staff.service';
@NgModule({
  declarations: [
StaffGroupListComponent,
FormDialogComponent,
DeleteComponent,
EditComponent,
FormAddChilsComponent,
StaffGroupChildComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StaffGroupRoutingModule,
    ComponentsModule,
    SharedModule,
    ColorPickerModule,

  ],

})
export class StaffGroupModule {}
