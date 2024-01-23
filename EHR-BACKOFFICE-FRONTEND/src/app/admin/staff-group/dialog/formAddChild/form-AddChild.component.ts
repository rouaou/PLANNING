import { Component,OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffGroupService } from '../../staff-group.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaffGroup } from '../../staff-group.model';
import { StaffGroupType } from '../../staff-group.enum';
import { StaffsService } from 'app/admin/staffs/staffs.service';
import { Staff } from 'app/admin/staffs/staffs.model';
import { StaffGrpLinkService } from 'app/admin/staff-group-link/staff-group-link.service';
import { StaffGroupLink } from 'app/admin/staff-group-link/staff-group-link.model';

export interface DialogData {
  staffGrp: StaffGroup;
  staffGrpList: StaffGroup[];
  action: string;
}
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormAddChilsComponent implements OnInit{
  staffGrp: StaffGroup;
  staffGrpList: StaffGroup[];
  action: string;
  staffs:Staff[]=[];
  // Déclarez le formulaire ici
  staffGroupTypes = Object.values(StaffGroupType);
  addchild: FormGroup;
  //staffGrpList: StaffGroup[]

  staffService:StaffsService | undefined;

  //staffToAdd!: Staff;
  constructor(
    public dialogRef: MatDialogRef<FormAddChilsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private staffGrpService: StaffGroupService,
    private router: Router,
    private snackBar: MatSnackBar,
    private staffGrpLinkservice: StaffGrpLinkService




    ) {  this.addchild = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      professionalEmail: ['', Validators.required],
      initials: ['', Validators.required],
      identifier: ['', Validators.required],
    //  signature: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.staffGrp= data.staffGrp;
    this.action= data.action;
    this.staffGrpList=data.staffGrpList




    //this.staffGrpList = data.staffGrpList;
  }


  // onPrivilegeChange() {
  //   // Update the staff object based on the checkbox state
  //   if (this.staffGrp.privilege === 1) {
  //     // Checkbox is checked, set privilege to 1
  //     this.staffGrp.privilege = 1;
  //   } else {
  //     // Checkbox is unchecked, set privilege to 0
  //     this.staffGrp.privilege = 0;
  //   }
  // }
  // saveStaffGrp(){
  //   const staffGrp : Partial<StaffGroup> = {
  //     groupName: this.StaffGrpForm?.get('groupName')?.value,
  //     type: this.StaffGrpForm?.get('type')?.value,
  //     privilege: (this.StaffGrpForm.get('privilege')!.value) ? 1 : 0


  //   }
  //   console.log(this.staffGrp);

  //   if (this.StaffGrpForm.valid){
  //   this.staffGrpService.createStaffGrp(staffGrp).subscribe( data =>{
  //       this.dialogRef.close(1); // Return 1 to indicate successful addition
  //       this.goToStaffGrpList();
  //       this.staffGrpList.push(data);
  //       },
  //       (error) => {
  //         console.error('Error adding staff :', error);
  //       }
  //     );

  // }}

  // addStaffToGroup(): void {
  //   const staffToAdd:Staff {
  //       // firstName: this.addchild?.get('firstName')?.value,
  //       // lastName: this.addchild?.get('lastName')?.value,
  //       // professionalEmail: this.addchild?.get('professionalEmail')?.value,
  //       // identifier: this.addchild?.get('identifier')?.value,
  //       // initials: this.addchild?.get('initials')?.value,
  //       // gender: this.addchild?.get('gender')?.value,
  //   }

  // if (this.addchild.valid){
  //   this.staffGrpService.addChildElement(this.data.stgrpKey,staffToAdd).subscribe(
  //     (response: string) => {
  //       // Handle success (e.g., show a success message)
  //       console.log('Response from server:', response);
  //     },
  //     (error: any) => {
  //       // Handle error
  //       console.error('Error adding child Staff:', error);
  //     }
  //   );
  // }}
  goToStaffGrpList(){
    this.router.navigate(['/admin/staffGroup/all-staffGroup'])
  }

  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }
  ngOnInit(): void {
    console.log('hhhh',this.data)
  }
  addchildMeth():void{
    const newStaff:Partial<Staff>={
      firstName: this.addchild.get('firstName')?.value,
      lastName:this.addchild.get('lastName')?.value,
      professionalEmail:this.addchild.get('professionalEmail')?.value,
      initials:this.addchild.get('initials')?.value,
      identifier:this.addchild.get('identifier')?.value,
    //  signature: ['', Validators.required],
      gender:this.addchild.get('gender')?.value,
      signature :'aaa',
      color:'aa'

    }
    console.log('new sTAFF',newStaff);

      this.staffGrpService.addChildElement(this.staffGrp?.stgrpKey, newStaff)
        .subscribe(
          (response: string) => {
            // Handle the successful response here
            console.log('Success:', response);
          },
          (error) => {
            // Handle any errors here
            console.error('Error:', error);
          }
        );


  }

  // assignStaff(): void {
  //   const staffId = this.StaffGrpForm.get('selectedStaffId').value;
  //   const staffGroupId = this.staffGroupId; // Replace with your logic to get the staff group ID

  //   // Call your service to assign the staff to the group
  //   this.staffService.assignStaffToGroup(staffId, staffGroupId).subscribe(
  //     (response) => {
  //       // Handle successful assignment
  //       console.log('Staff assigned successfully:', response);
  //       // Optionally, reset the form or update the UI
  //       this.staffGroupForm.reset();
  //     },
  //     (error) => {
  //       // Handle error
  //       console.error('Error assigning staff:', error);
  //     }
  //   );
  // }


}
