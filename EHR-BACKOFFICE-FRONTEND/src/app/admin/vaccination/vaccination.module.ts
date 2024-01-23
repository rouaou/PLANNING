import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaccListComponent } from './vacc-list/vacc-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { FeatherIconsModule } from '@shared/components/feather-icons/feather-icons.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRoutingModule } from '../admin-routing.module';
import { AllergyRoutingModule } from '../allergy/allergy-list/allergy.routing';
import { VaccinationRoutingModule } from './vacc-list/vaccination.routing';
import { DeleteComponent } from './vacc-list/delete/delete.component';
import { VaccinationAddEditComponent } from './vacc-list/vaccination-add-edit/vaccination-add-edit.component';



@NgModule({
  declarations: [
    VaccListComponent,
    DeleteComponent,
    VaccinationAddEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    MatIconModule,
    NgxPaginationModule,
    VaccinationRoutingModule,
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
export class VaccinationModule { }
