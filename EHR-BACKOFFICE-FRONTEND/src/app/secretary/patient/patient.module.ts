import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { PatientComponent } from './patient.component';
import { FormPatientDialogComponent } from './dialog/form-patient-dialog/form-patient-dialog.component';
import { PatientsRoutingModule } from './patient-routing.module';
import { EditPatientComponent } from './dialog/edit-patient/edit-patient.component';
import { DeletePatientDialogComponent } from './dialog/delete-patient-dialog/delete-patient.component';

@NgModule({
  declarations: [
PatientComponent,
FormPatientDialogComponent,
DeletePatientDialogComponent,
EditPatientComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],

})
export class PatientsModule {}
