import { Component,Inject,OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaffsService } from '../../staffs.service';
import { Staff } from '../../staffs.model';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '@core';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormStaffDialogComponent implements OnInit{

    // Déclarez le formulaire ici
    //typeStaff = Object.values(typeStaff);
    StaffForm: FormGroup;
    staffs: Staff[];
    staffList: Staff[]=[]
    staff: Staff | undefined ;
    StaffNames: string[]=[];
    constructor(
      public dialogRef: MatDialogRef<FormStaffDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      private staffsService: StaffsService,
      private router: Router,
      private snackBar: MatSnackBar



      ) {  this.StaffForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        identifier: ['', [Validators.required], [this.uniqueIdentifierValidator.bind(this)]],
        professionalEmail: ['', [Validators.required, Validators.email], [this.uniqueProfessionalEmailValidator.bind(this)]],
      //  signature: ['', Validators.required],
        gender: ['', Validators.required],
        phoneNumber: [null,
          [Validators.required, Validators.maxLength(8)],
          [this.phoneNumberUniqueValidator()]
        ],
        speciality: ['', Validators.required],
        adresse: ['', Validators.required],
        password: ['', Validators.required],
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

      this.staffs = data.staffs;
    }

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

    saveStaff(){
      const staff : Partial<Staff> = {
        firstName: this.StaffForm?.get('firstName')?.value,
        lastName: this.StaffForm?.get('lastName')?.value,
        professionalEmail:this.StaffForm?.get('professionalEmail')?.value,
       // initials: this.StaffForm?.get('initials')?.value,
        identifier: this.StaffForm?.get('identifier')?.value,
        gender: this.StaffForm?.get('gender')?.value,
        phoneNumber: this.StaffForm?.get('phoneNumber')?.value,
        speciality: this.StaffForm?.get('speciality').value,
        adresse: this.StaffForm?.get('adresse')?.value,
        password: this.StaffForm?.get('password')?.value,

      }
      console.log(staff);
      

      if (this.StaffForm.valid){
      this.staffsService.createStaff(staff).subscribe( data =>{
          this.dialogRef.close(1); // Return 1 to indicate successful addition
          this.goToStaffList();
          this.staffs.push(data);
          },
          (error) => {
            console.error('Error adding staff :', error);
          }
        );

    }}
    goToStaffList(){
      this.router.navigate(['/admin/staffs/all-staffs'])
    }

    onCloseClick(): void {
      // You can optionally pass data back to the component that opened the dialog
      this.dialogRef.close(/* optional data to pass back */);
    }
    ngOnInit(): void {
      this.loadStaff();
    }
    // onSubmit(){
    //   this.saveStaff();

    // }
    loadStaff(): void {
      this.staffsService.getAllStaffs().subscribe(
        (data) => {
          console.log(data);
        this.staffs = data;
        this.StaffNames = this.staffs.map(staff => staff.firstName);

        this.staffs = this.staffs.map(staff => staff);
        },
        (error) => {
          console.error('Error fetching treatment, error');
      }
      );
    }


}
