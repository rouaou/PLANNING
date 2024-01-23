import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiseaseCodeListComponent } from './disease-code-list/disease-code-list.component';
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
import { DiseaseCodeRoutingModule } from './disease-code-list/disease-code.routing';
import { DiseaseAddEditComponent } from './disease-code-list/disease-add-edit/disease-add-edit.component';
import { DeleteComponent } from './disease-code-list/delete/delete.component';



@NgModule({
  declarations: [DiseaseCodeListComponent, DiseaseAddEditComponent, DeleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    MatIconModule,
    NgxPaginationModule,
    DiseaseCodeRoutingModule,
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
export class DiseaseCodeModule { }
