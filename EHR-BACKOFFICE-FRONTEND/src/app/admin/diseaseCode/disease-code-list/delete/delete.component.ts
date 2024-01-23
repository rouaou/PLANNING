import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DiseaseCodeService } from '../disease-code.service';

export interface DialogData {
  disease_Key : number,
  chapter: string;
  category: string;

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
    public diseaseListService: DiseaseCodeService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.diseaseListService.deleteCode(this.data.disease_Key);
    this.dialogRef.close(1);
  }
}
