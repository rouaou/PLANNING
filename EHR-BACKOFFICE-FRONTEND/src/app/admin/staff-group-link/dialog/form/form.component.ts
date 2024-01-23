
import { Component,OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StaffsService } from 'app/admin/staffs/staffs.service';
import { HttpClient } from '@angular/common/http';
import { Staff } from 'app/admin/staffs/staffs.model';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})


export class FormComponent {
  selectedStaff = new FormControl([]);

  stgrpKey:number | undefined;

  searchQuery = '';

  isLoading: boolean = false;
  staffList: Staff[] = [];
  StaffNames : string[]=[];


constructor(
  private _dialog: MatDialog,
  private snackBar: MatSnackBar,

  private router: Router,
  private http: HttpClient,
  private staffService : StaffsService){ }

  loadstaffs(){
    this.staffService.getAllStaffs().subscribe((response) => {
      this.staffList = response;

      this.StaffNames = this.staffList.map(staff => staff.firstName);

      this.staffList = this.staffList.map(staff => staff);

      console.log('ingredients names:', this.StaffNames);

    },
    (error)=> {
      console.error('Error getting active ingredients:', error);
    }
    );
   }

   onStaffChange() {
    const selectedIds = this.selectedStaff.value;
    // this.staffGrpList.get('ActiveIngredients')?.setValue(selectedIds);
    return selectedIds;
   // console.log("selecteeed idss",selectedIds);
  }
}
