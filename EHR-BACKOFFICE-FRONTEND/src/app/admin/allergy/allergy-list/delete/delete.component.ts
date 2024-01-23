import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllergyListService } from '../allergy-list.service';


export interface DialogData {
  allergy_Key : number,
  algNm: string;
  algTyp: string;

}
@Component({
  selector: 'app-delete:not(d)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})

export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public allergyListService: AllergyListService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.allergyListService.deleteAllergy(this.data.allergy_Key);
    this.dialogRef.close(1);
  }

}

