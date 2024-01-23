import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VaccListService } from '../vacc-list.service';

export interface DialogData {
  vaccination_Key : number,
  vacNm: string;
  vacTyp: string;

}
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public vaccListService: VaccListService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.vaccListService.deleteVaccination(this.data.vaccination_Key);
    this.dialogRef.close(1);
  }
}
