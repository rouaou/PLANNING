import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Staff } from '../../staffs.model';
import { StaffsService } from '../../staffs.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormStaffDialogComponent } from '../formStaff-dialog/form-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {

  StaffForm: FormGroup;
  staffs: Staff;
  staff: Staff | undefined ;
  constructor(
    public dialogRef: MatDialogRef<EditStaffComponent>,

    @Inject(MAT_DIALOG_DATA) public data: Staff,
    private formBuilder: FormBuilder,
    private staffsService: StaffsService,
    private router: Router,
    private snackBar: MatSnackBar

    ){this.StaffForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        professionalEmail: ['', Validators.required],
        identifier: ['', Validators.required],
        gender: new FormControl('Male', Validators.required),
        phoneNumber: [
          null,
          [Validators.required, Validators.maxLength(8)],
          [this.phoneNumberUniqueValidator()]
        ] ,
             //  typeStaff: [''],
        speciality: [null],
        adresse: ['', Validators.required],


      });
      // this.StaffForm.get('typeStaff').valueChanges.subscribe((typeStaff) => {
      //   const specialityControl = this.StaffForm.get('speciality');
      //   if (typeStaff === 'Doctor') {
      //     specialityControl.setValidators(Validators.required);
      //   } else {
      //     specialityControl.clearValidators();
      //   }
      //   specialityControl.updateValueAndValidity();
      // });

      //on met l'objet staff dans data pour qu'on peut faire l'update
      this.staffs = data;}

      phoneNumberUniqueValidator(): AsyncValidatorFn {
        return (control: AbstractControl) => {
          const phoneNumber = control.value;

          if (!phoneNumber || isNaN(phoneNumber)) {
            return of(null); // Skip validation if the phone number is not provided or not a number
          }

          // Check if the phone number has exactly 8 digits
          const isPhoneNumberValid = phoneNumber.toString().length === 8;

          if (!isPhoneNumberValid) {
            return of({ phoneNumberInvalidLength: true });
          }

          return this.staffsService.checkPhoneNumberUniqueness(phoneNumber).pipe(
            map(isUnique => (isUnique ? null : { phoneNumberNotUnique: true })),
            catchError(() => of(null)) // Handle errors, returning null to avoid breaking the form
          );
        };
      }
      // addTypeChangeEventListener() {
      //   const typeControl = this.StaffForm.get('typeStaff');

      //   if (typeControl) {
      //     typeControl.valueChanges.subscribe((selectedType: string) => {
      //       const specialityControl = this.StaffForm.get('speciality');

      //       if (specialityControl) {
      //         // Enable or disable the speciality field based on the selected type
      //         if (selectedType === 'Doctor') {
      //           specialityControl.enable();
      //         } else {
      //           specialityControl.disable();
      //         }
      //       }
      //     });
      //   }
      // }
   // Custom validator for unique identifier
   uniqueIdentifierValidator(control) {
    return this.staffsService.checkIdentifierUnique(control.value).pipe(
      map((res) => (res ? null : { identifierNotUnique: true }))
    );
  }

  // Custom validator for unique professional email
  uniqueProfessionalEmailValidator(control) {
    return this.staffsService.checkProfessionalEmailUnique(control.value).pipe(
      map((res) => (res ? null : { professionalEmailNotUnique: true }))
    );
  }
      //populating the form fields with data from the selected staff member using
      ngOnInit(): void { this.StaffForm.patchValue(this.data);}
      saveUpdateStaff(){
        if (this.StaffForm.valid){
          this.staffsService.updateStaff(this.data.userKy,this.staffs ).subscribe( data =>{
            console.log(data);
            this.goToStaffList();
          },
          error => console.log(error));

        }
      }
      onSubmit(){
        if (this.StaffForm.valid){
          this.staffsService.updateStaff(this.data.userKy,this.StaffForm.value).subscribe( data =>{
            console.log(data);
            this.goToStaffList();
          },
          error => console.log(error));

        }
      }
      goToStaffList(){
        this.router.navigate(['/admin/staffs/all-staffs'])
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


