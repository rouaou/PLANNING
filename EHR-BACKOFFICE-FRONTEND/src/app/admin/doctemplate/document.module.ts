import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocListComponent } from './doc-list/doc-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
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
import { DocRoutingModule } from './doc-list/doc.routing';
import { DeleteComponent } from './doc-list/delete/delete.component';





@NgModule({
  declarations: [DocListComponent, DeleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    MatIconModule,
    NgxPaginationModule,
    DocRoutingModule,
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
export class DocumentModule { }
