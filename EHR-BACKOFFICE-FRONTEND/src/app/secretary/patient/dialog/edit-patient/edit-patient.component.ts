import { Component, Inject } from '@angular/core';
 import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
 import { Patient } from '../../patient.model';
 import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
 import { PatientService } from '../../patient.service';
 import { Router } from '@angular/router';
 import { MatSnackBar } from '@angular/material/snack-bar';

 @Component({
 selector: 'app-edit-patient',
 templateUrl: './edit-patient.component.html',
   styleUrls: ['./edit-patient.component.scss']
 })
export class EditPatientComponent {
  PatienttForm: FormGroup;
  patients: Patient;
  patient: Patient | undefined ;
 constructor(
    public dialogRef: MatDialogRef<EditPatientComponent>,

     @Inject(MAT_DIALOG_DATA) public data: Patient,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
     private snackBar: MatSnackBar

     ){this.PatienttForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: new FormControl('Male', Validators.required),
        birthDate: ['', Validators.required],
        email: new FormControl('', [Validators.required, Validators.email, ],[]),
        phoneNumber: ['', Validators.required],
       });

      //on met l'objet patient dans data pour qu'on peut faire l'update
     this.patients = data;}
       //populating the form fields with data from the selected staff member using
       ngOnInit(): void { this.PatienttForm.patchValue(this.data);}
     saveUpdatePatient(){
       if (this.PatienttForm.valid){
        this.patientService.updatePatient(this.data.userKy,this.patients).subscribe( data =>{
            console.log(data);
          },
          error => console.log(error));

         }
       }
      onSubmit(){
         if (this.PatienttForm.valid){
          this.patientService.updatePatient(this.data.userKy,this.PatienttForm.value).subscribe( data =>{
            console.log(data);
          },
         error => console.log(error));

        }
     }
      goToPatientList(){
        this.router.navigate(['/admin/Patient/all-patient'])
    }

       onCloseClick(): void {
        // You can optionally pass data back to the component that opened the dialog
        this.dialogRef.close(/* optional data to pass back */);
      }

      openSuccessSnackBar(message: string): void {
      this.snackBar.open(message, '', {
         duration: 3000,
         horizontalPosition: 'start',
                    panelClass: ['snackbar-success']
        });
      }
 }
