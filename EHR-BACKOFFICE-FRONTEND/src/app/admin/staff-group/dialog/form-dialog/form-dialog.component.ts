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
import { Service } from 'app/admin/structure/service/service.model';
import { ServiceService } from 'app/admin/structure/service/service.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit{
  staffs:Staff[]=[];
  // Déclarez le formulaire ici
  staffGroupTypes = Object.values(StaffGroupType);
  StaffGrpForm: FormGroup;
  staffGrpList: StaffGroup[]=[]
  staffGrp: StaffGroup | undefined
  staffService:StaffsService | undefined
  selectedColor: string = '#FFFFFF'; // Initialize with a default color
  services: Service[]=[];
  ServiceNames: string[]=[];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private staffGrpService: StaffGroupService,
    private router: Router,
    private snackBar: MatSnackBar,
    private serviceService: ServiceService,




    ) {  this.StaffGrpForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      type: [null, Validators.required],
      privilege: [false],
      selectedStaffId: [''],
      service:['']
    });


    this.staffGrpList = data.staffGrpList;
  }
  ngOnInit(): void {
    this.staffGrp = this.data.staffGroup;
    this.loadservices();

  }
  loadservices() {
    this.serviceService.getAllServices().subscribe((response) => {
     this.services = response;
     this.ServiceNames = this.services.map(service => service.serviceNm);

     this.services = this.services.map(service => service);

    },
      (error) => {
       console.error('Error getting services:', error);
      }
    );
  }

  saveStaffGrp() {
     if ( this.StaffGrpForm && this.StaffGrpForm.valid) {

    const staffGrp: Partial<StaffGroup> = {
      groupName: this.StaffGrpForm?.get('groupName')?.value,
      type: this.StaffGrpForm?.get('type')?.value,
      privilege: this.StaffGrpForm.get('privilege')!.value ? 1 : 0,
      service:this.StaffGrpForm?.get('groupName')?.value
    };

    console.log(this.staffGrp);


      this.staffGrpService.createStaffGrp(staffGrp).subscribe(
        (data) => {
          this.dialogRef.close(1); // Return 1 to indicate successful addition

          // Now, you can safely push data into staffGrpList.
          this.staffGrpList.push(data);
        },
        (error) => {
          console.error('Error adding staff:', error);
        }
      );
    }
  }







  goToStaffGrpList(){
    this.router.navigate(['/admin/staffGroup/all-staffGroup'])
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }




}
