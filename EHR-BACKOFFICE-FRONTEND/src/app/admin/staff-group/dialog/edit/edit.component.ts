import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffGroupService } from '../../staff-group.service';
import { StaffGroup } from '../../staff-group.model';
import { StaffGroupType } from '../../staff-group.enum';
import { Staff } from 'app/admin/staffs/staffs.model';
import { StaffsService } from 'app/admin/staffs/staffs.service';
import { StaffGroupLink } from 'app/admin/staff-group-link/staff-group-link.model';
import { StaffGrpLinkService } from 'app/admin/staff-group-link/staff-group-link.service';
import { er } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  selectedStaff = new FormControl();
  selectedUsers: Staff[] = [];
  staffGroupTypes = Object.values(StaffGroupType);
  stgrpKey!: number;
  StaffGrpForm: FormGroup;
  staffGrpList: StaffGroup[]=[];
  staffGrp: StaffGroup | undefined;
  staffList: Staff[] = [];
  StaffNames: string[] = [];
  staffGrpLinks: StaffGroupLink[] = []
  s: any[] = [];
  assignedStaff: any[] = [];
  selectStaff: any[] = [];
  searchQuery = '';

  selectedStaffGroup: number;
  unselectedStaffs: Staff[] = []
  filteredStaffGroups: StaffGroup[] = [];
  staffsGrp!: StaffGroup[];
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,

    @Inject(MAT_DIALOG_DATA) public data: StaffGroup,
    private formBuilder: FormBuilder,
    private staffGrpService: StaffGroupService,
    private staffGrpLinkService: StaffGrpLinkService,
    private router: Router,
    private snackBar: MatSnackBar,
    private staffService: StaffsService

  ) {
    this.selectedStaffGroup = data.stgrpKey

    this.staffGrpLinkService.getAllStaffGrpLinks().subscribe((data) => {
      this.staffGrpLinks = data;
    });
    this.StaffGrpForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      type: ['', Validators.required],
      privilege: [false],

    });


    //on met l'objet staff dans data pour qu'on peut faire l'update
    //this.staffGrpList = data;
  }
  //populating the form fields with data from the selected staff member using
  ngOnInit(): void {
    console.log("Recievd staff group", this.selectedStaffGroup) // retrived ky from the staffgrp list
    this.StaffGrpForm.patchValue(this.data);
    this.loadstaffs();
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

  getgroupkeys(grpkey: number): void {
    this.staffGrpService.getChildElements(grpkey).subscribe((selecteddata) => {
      this.assignedStaff = selecteddata.map((sel) => sel.userKy);
      for (let St of this.staffList) {
        if (this.assignedStaff.includes(St.userKy))
          St.ischeked = true;
      }
      this.showSelected();
      console.log(this.assignedStaff);

    });
  }
  showSelected(): void {
    var selected: number[] = [];
    for (const staff of this.staffList) {
      if (staff.ischeked) {
        selected.push(staff.userKy)
      }
    }
    this.selectedStaff.patchValue(selected);
    console.log("show:", this.selectedStaff.value)
  }

  onSelectionChange(event: any) {
    // Update the selected staff members when the selection changes
    this.selectStaff = event.value;
  }

  compareStaff(staff1: any, staff2: any): boolean {
    return staff1 && staff2 ? staff1.id === staff2.id : staff1 === staff2;
  }


  saveUpdateStaffGrp() {
    if (this.StaffGrpForm.valid) {
      // Unassign unselected staff members from the group
      const selectedItems = this.selectedStaff.value || [];
      const unselectedItems = this.staffList.filter(staff => !selectedItems.includes(staff));
      // assign selected staff members one by one
      selectedItems?.forEach((item: any) => {
        this.staffGrpLinkService.assignStaffToGroup(item, this.data.stgrpKey).subscribe(
          (response) => {
            console.log('Response: assignStaffToGroup', response);
            // Handle the response here
          },
          (error) => {
            console.log('Error: assignStaffToGroup', error);
            // Handle the error here
          }
        );
      });
      // Unassign unselected staff members one by one
      // unselectedItems?.forEach((item: any) => {
      //   this.staffGrpLinkService.unassignStaffFromGroup(item, this.data.stgrpKey).subscribe(
      //     (response) => {
      //       console.log('Response: unassignStaffFromGroup', response);
      //       // Handle the response here
      //     },
      //     (error) => {
      //       console.log('Error: unassignStaffFromGroup', error);
      //       // Handle the error here
      //     }
      //   );
      // });

      // Once unassignment is complete, proceed to update the group
      this.staffGrpService.updateStaffGrp(this.StaffGrpForm.value, this.data.stgrpKey).subscribe(data => {
        console.log('Response: updateStaffGrp', data);
        // Handle the response here

        // Close the dialog and navigate
        this.dialogRef.close(1);
        this.refresh();
      }, error => {
        console.log('Error: updateStaffGrp', error);
        // Handle the error here
      });
    }
  }

  onSubmit() {
    if (this.StaffGrpForm.valid) {
      this.staffGrpService.updateStaffGrp(this.StaffGrpForm.value, this.data.stgrpKey).subscribe(data => {
        console.log(data);
        this.goToStaffGrpList();
      },
        error => console.log(error));

    }
  }


  goToStaffGrpList() {
    this.router.navigate(['/admin/staffGroup/all-staffGroup'])
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


  loadstaffs() {
    this.staffService.getAllStaffs().subscribe((response) => {
      this.staffList = response;

      this.StaffNames = this.staffList.map(staff => staff.firstName);

      this.staffList = this.staffList.map(staff => staff);

      console.log('staff names:', this.StaffNames);

    },
      (error) => {
        console.error('Error getting staffs:', error);
      }
    );
  }

  onStaffChange() {
    const selectedIds = this.selectedStaff.value;
    console.log("Selected staffs", selectedIds)
    return selectedIds;
  }
}
