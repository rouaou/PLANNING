import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Staff } from 'app/admin/staffs/staffs.model';
import { StaffsService } from 'app/admin/staffs/staffs.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  constructor(
  public dialogRef: MatDialogRef<DeleteComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Staff,
  public staffService: StaffsService)
  {}


  onNoClick(): void {
    this.dialogRef.close();
  }

}
