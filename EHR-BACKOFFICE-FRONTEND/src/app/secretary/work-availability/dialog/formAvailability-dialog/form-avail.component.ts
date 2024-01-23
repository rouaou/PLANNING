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
import {  WorkAvailability } from '../../work-availability.model';
import { AvailabilityType } from '../../work-availability.enum';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-avail.component.html',
  styleUrls: ['./form-avail.component.scss']
})
export class FormAvailDialogComponent implements OnInit{
  // @Input() staff: any; // Adjust the type accordingly
  // @Input() availability: any;
    // Déclarez le formulaire ici
    //typeStaff = Object.values(typeStaff);
    AvailForm: FormGroup;
    staffs: Staff[];
    staffList: Staff[]=[];
   // staff: Staff | undefined ;
    StaffNames: string[]=[];
    staffId: number;
    availabilityTypes: AvailabilityType[] = [AvailabilityType.WORK, AvailabilityType.BREAK, AvailabilityType.LEAVE];
    // dayOfWeekOptions = [
    //   { label: 'Dimanche', value: DayOfWeek.Sunday },
    //   { label: 'Lundi', value: DayOfWeek.Monday },
    //   { label: 'Mardi', value: DayOfWeek.Tuesday },
    //   { label: 'Mercredi', value: DayOfWeek.Wednesday },
    //   { label: 'Jeudi', value: DayOfWeek.Thursday },
    //   { label: 'Vendredi', value: DayOfWeek.Friday },
    //   { label: 'Samedi', value: DayOfWeek.Saturday },
    // ];
    constructor(
      public dialogRef: MatDialogRef<FormAvailDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      private staffsService: StaffsService,
      private router: Router,
      private snackBar: MatSnackBar,
      private availService:WorkAvailabilityService



      ) { this.AvailForm = this.formBuilder.group({
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        type: [null, Validators.required],
        //day: [null, Validators.required],
      });
        this.staffId = data.userKy;
        console.log("Staffid", this.staffId)
    }

    submit(){}


    addAvail() {
      if (this.AvailForm && this.AvailForm.valid) {
        const avail: Partial<WorkAvailability> = {
          startDate: new Date(),
          endDate: new Date(),
          startTime: this.AvailForm.get('startTime')?.value,
          endTime: this.AvailForm.get('endTime')?.value,
          type: this.AvailForm.get('type')?.value,
        };

        console.log("the id",this.staffId);
        console.log("the avail",avail);


    this.availService.addAvailabilityToStaff(this.staffId, avail)
    .subscribe(
      (response) => {
        // ... handle successful response ...
      },
      (error) => {
        console.error('Error adding availability', error);
        this.snackBar.open(error.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
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
