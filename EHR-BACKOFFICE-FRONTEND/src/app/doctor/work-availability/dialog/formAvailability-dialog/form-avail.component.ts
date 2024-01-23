import { Component,Inject,Input,OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Staff } from 'app/admin/staffs/staffs.model';
import { StaffsService } from 'app/admin/staffs/staffs.service';
import { WorkAvailabilityService } from '../../work-availability.service';
import { WorkAvailability } from '../../work-availability.model';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-avail.component.html',
  styleUrls: ['./form-avail.component.scss']
})
export class FormAvailDialogComponent implements OnInit{
  @Input() staff: any; // Adjust the type accordingly
  @Input() availability: any;
    // Déclarez le formulaire ici
    //typeStaff = Object.values(typeStaff);
    AvailForm: FormGroup;
    staffs: Staff[];
    staffList: Staff[]=[];
   // staff: Staff | undefined ;
    StaffNames: string[]=[];
    staffId: number;

    constructor(
      public dialogRef: MatDialogRef<FormAvailDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      private staffsService: StaffsService,
      private router: Router,
      private snackBar: MatSnackBar,
      private availService:WorkAvailabilityService



      ) { this.AvailForm = this.formBuilder.group({
        startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      //staff: [null, Validators.required],
      });
        this.staffId = data.userKy;
        console.log("Staffid", this.staffId)
    }

    submit(){}


addAvail(){
  if (this.AvailForm && this.AvailForm.valid){
    const avail : Partial<WorkAvailability> = {
      // startDate: this.AvailForm.get('startDate')?.value,
      // endDate: this.AvailForm.get('endDate')?.value,
      startDate: new Date(),
      endDate: new Date(),
      startTime: this.AvailForm.get('startTime')?.value,
      endTime: this.AvailForm.get('endTime')?.value,
    }


    console.log("Availibility", avail)

    this.availService.addAvailabilityToStaff(this.staffId, avail).subscribe(
      (response) => {
        console.log('Availability added successfully', response);
        // Handle success, if needed
      },
      (error) => {
        console.error('Error adding availability', error);
        // Handle error, show a message, etc.
      }
    );
  }
  }
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
