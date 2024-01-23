import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { activeIngredientssRoutingModule } from './activeIngredient-routing.module';
import { ActiveIngredientsListComponent } from './active-ingredients-list/active-ingredients-list.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
//import { FormDialogComponent } from './physical-treatments-list/dialog/form-dialog/form-dialog.component';
//import { DeleteComponent } from './physical-treatments-list/dialog/delete/delete.component';

@NgModule({
  declarations: [
    ActiveIngredientsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    activeIngredientssRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  // providers: [],
})
export class activeIngredientsModule { }
