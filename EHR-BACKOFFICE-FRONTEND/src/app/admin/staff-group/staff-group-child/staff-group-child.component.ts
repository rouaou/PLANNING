import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffGrpLinkService } from 'app/admin/staff-group-link/staff-group-link.service';
import { StaffGroup } from '../staff-group.model';
import { Direction } from '@angular/cdk/bidi';
import { FormAddChilsComponent } from '../dialog/formAddChild/form-AddChild.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Staff } from 'app/admin/staffs/staffs.model';
import { StaffsService } from 'app/admin/staffs/staffs.service';

@Component({
  selector: 'app-staff-group-child',
  templateUrl: './staff-group-child.component.html',
  styleUrls: ['./staff-group-child.component.scss']
})
export class StaffGroupChildComponent {
  essai: any;

  filteredStaffs: Staff[] = [];
  searchQuery = '';

  userKy:any;// Declare staffKy property with appropriate type
  stgrpKey: any;
  receivedData:Staff ;
  staffGrpLinkKy: number ;
  staffGrpKy: number;
  staffKy: number;
constructor(

  private route:Router,
  private staffGrpLinkService: StaffGrpLinkService,
  private _dialog: MatDialog,
  private snackBar: MatSnackBar,
  private staffService: StaffsService

){

  if (this.route.getCurrentNavigation().extras.state) {
    let pathData:Staff  = this.route.getCurrentNavigation().extras.state['stafData'];
    if (pathData) {
      this.receivedData = pathData;
    }
}
}
ngOnInit(): void {
  console.log(this.receivedData);
  //console.log(this.staffGrpList); // Add this line


  //this.loadAllChildElements();
  // this.staffGrpLinkService
  //     .findStaffGrpLinkKy(this.staffGrpKy, this.staffKy)
  //     .subscribe(
  //       (result) => {
  //         this.staffGrpLinkKy = result;
  //       },
  //       (error) => {
  //         console.error('Error fetching data:', error);
  //       }
  //     );

}

addChild(staffGroup : StaffGroup){

  let tempDirection: Direction;
   if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }

  const dialogRef = this._dialog.open(FormAddChilsComponent, {
   data: {
     staffGrp: staffGroup,
      action: 'add-staff',
    },
   direction: tempDirection,
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      this.openSuccessSnackBar("staff Added Successfully !")
      //this.refresh();
     }
  });

   }
   openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-success"]
    });
  }
  // searchStaffs(): void {
  //   this.receivedData = this.staffs.filter(staff =>
  //     staff.firstName.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     //|| staffGroup.type.toLowerCase().includes(this.searchQuery.toLowerCase())

  //     );
  // }

unassignStaff(userKy: number) {
  // Check if userKy and staffGrpKy are valid numbers
  if (userKy) {
    console.log('userKy:', userKy);
console.log('staffGrpKy (this.essai):', this.essai);
    this.staffGrpLinkService.unassignStaffFromGroup(userKy, this.essai)
      .subscribe(
        (response) => {
          // Handle the successful response from the backend here
          console.log('Successfully unassigned staff:', response);
        },
        (error) => {
          console.log(error)
        }
      );
  } else {
    console.error('Invalid userKy or staffGrpKy values.');
  }
}


deleteStaffGrpLink(staffGrpLinkKy: number): void {

  this.staffGrpLinkService.deleteStaffGrpLink(staffGrpLinkKy)
    .subscribe(
      () => {
        // Success: Handle success actions, e.g., remove the row from your data array.
      },
      (error) => {
        // Handle the error, e.g., show an error message to the user.
      }
    );
}
}








