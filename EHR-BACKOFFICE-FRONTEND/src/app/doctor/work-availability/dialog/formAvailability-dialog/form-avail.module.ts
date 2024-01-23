import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatIconModule } from '@angular/material/icon';

//import { StaffService } from '../staff/allstaff/staff.service';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,

    MatIconModule,
    ReactiveFormsModule,

  ],
  //providers: [StaffService],
})
export class AvailFormModule {}
