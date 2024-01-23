import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { StaffGroup } from '../staff-group.model';
import { StaffGroupService } from '../staff-group.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { Direction } from '@angular/cdk/bidi';
import { FormDialogComponent } from '../dialog/form-dialog/form-dialog.component';
import { EditComponent } from '../dialog/edit/edit.component';
import { DeleteComponent } from '../dialog/delete/delete.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Staff } from 'app/admin/staffs/staffs.model';
import { StaffsService } from 'app/admin/staffs/staffs.service';
import { FormControl } from '@angular/forms';
import { FormAddChilsComponent } from '../dialog/formAddChild/form-AddChild.component';
import { StaffGrpLinkService } from 'app/admin/staff-group-link/staff-group-link.service';
import { StaffGroupLink } from 'app/admin/staff-group-link/staff-group-link.model';

@Component({
  selector: 'app-staff-group-list',
  templateUrl: './staff-group-list.component.html',
  styleUrls: ['./staff-group-list.component.scss']
})
export class StaffGroupListComponent {

// 3abi
selectedStaff = new FormControl([]);
staffGrpLinks: StaffGroupLink[] = [];

//stgrpKey:number | undefined;
filteredStaffGroups: StaffGroup[] = [];
  searchQuery = '';
  @Input('data') staffGrpList: StaffGroup[]=[];
  staffsGrp!: StaffGroup[];
  isLoading: boolean = false;
  staffList: Staff[] = [];
  StaffNames : string[]=[];


constructor(
  private _dialog: MatDialog,
  private snackBar: MatSnackBar,
  private staffGrpService: StaffGroupService,
  private staffGrpLinkService: StaffGrpLinkService,
  private router: Router,
  private http: HttpClient,
  private staffService : StaffsService,
  private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ){
    this.fetchData();

   }


ngOnInit(): void {
  //console.log(this.staffGrpList); // Add this line
 this.staffGrpService.getAllStaffGrp().subscribe(
  (data) => {
    this.staffGrpList = data;
    },
    (error) => {
      // Handle errors if any
      console.error('Error fetching staffgrp data:', error);
    }
  );
  this.fetchAllStaffGrpLinks();
  //this.loadAllChildElements();

}
fetchData(): void {
  this.isLoading = true;
  this.staffGrpService.getAllStaffGrp().subscribe(
    (data: StaffGroup[]) => {
      this.staffGrpList = data;
      this.filteredStaffGroups = data;
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching data:', error);
      this.isLoading = false; // Ensure loading state is cleared even in case of error
    }
  );
}

refresh() {
  this.searchQuery = ''; // Clear the search query
  this.fetchData();
}

searchStaffGroups(): void {
  this.filteredStaffGroups = this.staffGrpList.filter(staffGroup =>
    staffGroup.groupName.toLowerCase().includes(this.searchQuery.toLowerCase())
    //|| staffGroup.type.toLowerCase().includes(this.searchQuery.toLowerCase())

    );
}
hasStaffGroups(): boolean {
  return this.filteredStaffGroups.length > 0;
}

fetchStaffs(stgrpKey: number): void {
  this.router.navigate(['admin','structure', 'staff-group', stgrpKey, 'child-elements']);
}
hasStaffsElements(staffGroup: StaffGroup): boolean {
  return staffGroup.staffGrpLinks?.length > 0;
}
addStaffToGroup(staffGrpId: number, staffToAdd: any): void {
  this.staffGrpService.addChildElement(staffGrpId, staffToAdd).subscribe(
    (response: string) => {
      // Handle success (e.g., show a success message)
      console.log('Response from server:', response);
    },
    (error: any) => {
      // Handle error
      console.error('Error adding child Staff:', error);
    }
  );
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
       this.refresh();
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
openErrorSnackBar(message: string): void {
  this.snackBar.open(message,'',{
    duration: 3000,
    horizontalPosition: 'start',
    panelClass: ["snackbar-error"]
  });
}
openAddEditForm() {

 const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

 const dialogRef = this._dialog.open(FormDialogComponent, {
   data: {

   },
   direction: tempDirection,
 });

 dialogRef.afterClosed().subscribe((result) => {
   if (result === 1) {
     this.openSuccessSnackBar("StaffGroup Added Successfully!");
     this.refresh();

   }
 });
}
openEditForm(data: StaffGroup){
  this._dialog.open(EditComponent, {
    data,
  });
  this._dialog.afterAllClosed.subscribe(()=>{
    this.loadStaffGrp();
    this.refresh();
  })
}
 getStaffsGrp(){
  this.staffGrpService.getAllStaffGrp().subscribe(data => {
    // data is a response data and we assign it to the categories property
    this.staffGrpList = data;
  })

}

 DeleteStaffGrp(staffGrp: StaffGroup){
  console.log(staffGrp);
  console.log(staffGrp.stgrpKey);
  const dialogRef = this._dialog.open(DeleteComponent, {
         data:staffGrp,
 });
  dialogRef.afterClosed().subscribe((result: number) => {
    if(result == 1){
     this.staffGrpService.deleteStaffGrp(staffGrp.stgrpKey).subscribe(
        () => {
          this.refresh();
         console.log('Staff group deleted successfully.');

         this.loadStaffGrp();
         this.getStaffsGrp();
       },
    (error) => {
       console.error('Error while deleting staff:', error);
        if (error instanceof HttpErrorResponse) {
          console.error(`Status: ${error.status}, Message: ${error.message}`);
      }
         }
   )}}

)}
loadStaffGrp(): void {
  this.staffGrpService.getAllStaffGrp().subscribe(
    (data) => {
      console.log(data);
    this.staffsGrp = data;
    },
    (error) => {
      console.error('Error fetching staffGrp, error');
  }
  );

}

edit(sgrp : StaffGroup) {
  let tempDirection: Direction;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogRef = this._dialog.open(FormDialogComponent, {
    data: {
      staffGrpList: this.staffGrpList,
      sgrp: sgrp,
      action: 'edit',
    },
    direction: tempDirection,
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      this.openSuccessSnackBar("staff Group Updated Successfully !")
    }
  });
}


navigateToStaffGroupLinks() {
  this.router.navigate(['/admin/staffGroupLink']);
}

fetchAllStaffGrpLinks() {
  this.staffGrpLinkService.getAllStaffGrpLinks().subscribe(
    (data) => {
      // Handle the response data here
      this.staffGrpLinks = data;
    },
    (error) => {
      // Handle any errors that occur during the API call
      console.error(error);
    }
  );
}
childElements: Staff[] = [];
loadAllChildElements(data:any) {
  this.staffGrpService.getChildElements(data.stgrpKey).subscribe(
    (childElements) => {
      this.childElements = childElements;
      console.log("childreeeeeeen",childElements);
    },
    (error) => {
      console.error(error);
    }
  );
}


// openChilds(data:any) {
//   this.staffGrpService.getChildElements(data.stgrpKey).subscribe(
//     (childElements) => {
//       this.childElements = childElements;
//       console.log("bien",childElements);
//       this.router.navigate(['/admin/child',this.childElements])

//     },
//     (error) => {
//       console.error(error);
//     }
//   );

// }
openChilds(data: StaffGroup) {
  this.staffGrpService.getChildElements(data.stgrpKey).subscribe(
        (childElements) => {
          this.childElements = childElements;
          console.log("bien",childElements);
          const navigationExtras: NavigationExtras = {
            state: {
              stafData: this.childElements
            }
          };
          this.router.navigate(['/admin/child'],navigationExtras);
        },
       (error) => {
          console.error(error);
        }
      );

}

}

