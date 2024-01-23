import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BioAnalysesService } from '../bio-analyses.service';
export interface DialogData {
  analyse_Key : number,
  ansNm: string;
  bioAnsTyp: string;

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
    public bioAnalysesService: BioAnalysesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.bioAnalysesService.deleteAnalyse(this.data.analyse_Key);
    this.dialogRef.close(1);
  }
}
