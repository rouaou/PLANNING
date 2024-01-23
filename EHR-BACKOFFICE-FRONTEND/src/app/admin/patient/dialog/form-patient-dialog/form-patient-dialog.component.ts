import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../patient.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../patient.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-patient-dialog',
  templateUrl: './form-patient-dialog.component.html',
  styleUrls: ['./form-patient-dialog.component.scss']
})
export class FormPatientDialogComponent implements OnInit{

  // Déclarez le formulaire ici

  PatienttForm: FormGroup;
  patients: Patient[]
  patient: Patient | undefined ;

  constructor(
    public dialogRef: MatDialogRef<FormPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private snackBar: MatSnackBar



    ) {  this.PatienttForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],

    });
    this.patients = data.patients;
  }


  savePatient(){
    const patient : Partial<Patient> = {
      firstName: this.PatienttForm?.get('firstName')?.value,
      lastName: this.PatienttForm?.get('lastName')?.value,
      gender: this.PatienttForm?.get('gender')?.value,


    }
    console.log(patient);

    if (this.PatienttForm.valid){
    this.patientService.createPatient(patient).subscribe( data =>{
        this.dialogRef.close(1); // Return 1 to indicate successful addition
        this.patients.push(data);
        },
        (error) => {
          console.error('Error adding patient :', error);
        }
      );

  }}


  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }
  ngOnInit(): void {
  }
  // onSubmit(){
  //   this.saveStaff();

  // }
  loadPatient(): void {
    this.patientService.getAllPatient().subscribe(
      (data) => {
        console.log(data);
      this.patients = data;
      },
      (error) => {
        console.error('Error fetching treatment, error');
    }
    );
  }

}
