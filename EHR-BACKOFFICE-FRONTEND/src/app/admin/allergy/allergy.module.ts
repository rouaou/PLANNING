import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { AllergyListComponent } from './allergy-list/allergy-list.component';
import { AllergyListService } from './allergy-list/allergy-list.service';
import { DeleteComponent } from './allergy-list/delete/delete.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { AllergyRoutingModule } from './allergy-list/allergy.routing';
import { AdminRoutingModule } from '../admin-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CalendarService } from 'app/calendar/calendar.service';
import { FeatherIconsModule } from '@shared/components/feather-icons/feather-icons.module';
import { AllergyAddEditComponent } from './allergy-list/allergy-add-edit/allergy-add-edit.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { SymptomsRoutingComponent } from './allergy-list/symptoms-add-edit/symptoms-routing.module';

@NgModule({
  providers: [CalendarService],
  declarations: [
    AllergyListComponent,
    DeleteComponent,
    AllergyAddEditComponent,
    /*SymptomsRoutingComponent,*/


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    MatIconModule,
    MatSelectModule,
    NgxPaginationModule,
    AllergyRoutingModule,
    AdminRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FeatherIconsModule


  ]
})
export class AllergyModule {}
