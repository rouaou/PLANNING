  import { Component, Inject } from '@angular/core';


  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffGroupService } from '../../staff-group.service';
import { StaffGroup } from '../../staff-group.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {



    constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffGroup,
    public staffGrpService: StaffGroupService)
    {}


    onNoClick(): void {
      this.dialogRef.close();
    }


  }
