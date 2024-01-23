import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRoutingModule } from '../admin-routing.module';
import { BioAnalysesRoutingModule } from './bio-analyses-list/bio-analyses.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FeatherIconsModule } from '@shared/components/feather-icons/feather-icons.module';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { BioAnalysesListComponent } from './bio-analyses-list/bio-analyses-list.component';
import { AnalysesAddEditComponent } from './bio-analyses-list/analyses-add-edit/analyses-add-edit.component';
import { DeleteComponent } from './bio-analyses-list/delete/delete.component';




@NgModule({
  declarations: [
    BioAnalysesListComponent,
    AnalysesAddEditComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    MatIconModule,
    NgxPaginationModule,
    BioAnalysesRoutingModule,
    AdminRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FeatherIconsModule
  ]
})
export class BioAnalysesModule { }
