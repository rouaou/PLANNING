import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { equipmentRoutingModule } from './equipment-routing.module';
import { FormComponent } from './form/form/form.component';
import { DeleteComponent } from './delete/delete/delete.component';
import { EquipmentComponent } from './equipment.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
FormComponent,
DeleteComponent,
EquipmentComponent


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    equipmentRoutingModule,
    ComponentsModule,
    SharedModule,
    NgxPaginationModule,

  ],
})
export class EquipmentsModule {}
