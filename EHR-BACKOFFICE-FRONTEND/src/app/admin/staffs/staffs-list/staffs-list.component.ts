import { Component, Input } from '@angular/core';
import { StaffsService } from '../staffs.service';
import { Staff } from '../staffs.model';
import { Direction } from '@angular/cdk/bidi';
import { FormStaffDialogComponent } from '../dialog/formStaff-dialog/form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditStaffComponent } from '../dialog/edit-staff/edit-staff.component';
import { DeleteComponent } from '../dialog/delete/delete.component';
import { HttpErrorResponse } from '@angular/common/http';
import { StaffGroup } from 'app/admin/staff-group/staff-group.model';
import { StaffGroupService } from 'app/admin/staff-group/staff-group.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-staffs-list',
  templateUrl: './staffs-list.component.html',
  styleUrls: ['./staffs-list.component.scss']
})
export class StaffsListComponent {
  // 3abi
  @Input('data') staffs:Staff[]=[];
  filteredStaffs: Staff[] = [];
  searchQuery = '';

  stgrpKey: number | undefined;
  staffGroup: StaffGroup| undefined;
  isLoading: boolean = false;
  constructor(
    private staffService: StaffsService,
    private _dialog: MatDialog,
    private snackBar: MatSnackBar,
    private staffGrpService: StaffGroupService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.displayStaffs();
    this.getParent();

    console.log(this.staffs); // Add this line
   this.staffService.getAllStaffs().subscribe(
    (data) => {
      this.staffs = data;
      },
      (error) => {
        // Handle errors if any
        console.error('Error fetching staff data:', error);
      }
    );
  }

  displayStaffs(): void {
    this.isLoading = true;
    const staffGrpKyParam = this.route.snapshot.paramMap.get('stgrpKey');
    if (staffGrpKyParam) {
      const stgrpKey = +staffGrpKyParam;
      this.staffGrpService.getChildElements(stgrpKey).subscribe(
        (data: any) => {
          this.staffs = data;
          this.filteredStaffs = data;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching staffs:', error);
          this.isLoading = false;
        }
      );
    }
  }


  getParent(): void {
   // this.stgrpKey = this.getCurrentStaffGroupKey();
    this.staffGrpService.getStaffGrpById(this.stgrpKey).subscribe(
      (staffGroup: StaffGroup) => {
        this.staffGroup = staffGroup;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

   getCurrentStaffGroupKey(): number {
    const urlSegments = this.route.snapshot.url;
   const staffGroupKeyIndex = urlSegments.findIndex(segment => segment.path === 'staff-group');
     if (staffGroupKeyIndex !== -1 && staffGroupKeyIndex + 1 < urlSegments.length) {
       return +urlSegments[staffGroupKeyIndex + 1].path;
     }
   return 0;
  }
  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-success"]
    });
  }
  refresh() {
    this.displayStaffs();
  }
  openAddEditForm() {
   //this._dialog.open(FormDialogComponent);
   const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

   const dialogRef = this._dialog.open(FormStaffDialogComponent, {
     data: {

     },
     direction: tempDirection,
   });

   dialogRef.afterClosed().subscribe((result) => {

     if (result === 1) {
       this.openSuccessSnackBar("Staff Added Successfully!");

     }this.loadStaff();
   });
  }
  openEditForm(data: Staff){
    this._dialog.open(EditStaffComponent, {
      data,
    });
  }
  private getStaffs(){
    this.staffService.getAllStaffs().subscribe(data => {
      // data is a response data and we assign it to the categories property
      this.staffs = data;
    })

  }

  DeleteStaff(staff: Staff){
    console.log(staff);
    console.log(staff.userKy);
    const dialogRef = this._dialog.open(DeleteComponent, {
      data:staff,
    });
    dialogRef.afterClosed().subscribe((result: number) => {
      if(result == 1){
        this.staffService.deleteStaff(staff.userKy).subscribe(
          () => {
            console.log('Staff deleted successfully.');
            this.getStaffs();
            this.loadStaff();
          },
          (error) => {
            console.error('Error while deleting staff:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
           }
    )}}

  )}

  searchStaffs(): void {
  this.staffs = this.staffs.filter(staff =>
    staff.firstName.toLowerCase().includes(this.searchQuery.toLowerCase())
    //|| staffGroup.type.toLowerCase().includes(this.searchQuery.toLowerCase())

    );
}
  loadStaff(): void {
    this.staffService.getAllStaffs().subscribe(
      (data) => {
        console.log(data);
      this.staffs = data;
      },
      (error) => {
        console.error('Error fetching staff, error');
    }
    );
  }
}
