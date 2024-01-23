import { Component, Inject, Input, OnInit } from '@angular/core';
import { VaccList } from '../vacc-list.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VaccListService } from '../vacc-list.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  id : number;
  action: string;
  vaccination: VaccList;
}
@Component({
  selector: 'app-vaccination-add-edit',
  templateUrl: './vaccination-add-edit.component.html',
  styleUrls: ['./vaccination-add-edit.component.scss']
})
export class VaccinationAddEditComponent implements OnInit {
  vaccinationForm!: FormGroup;
  vaccination: VaccList = {} as VaccList;
  isLoading: boolean = false;
  dialogTitle?: string;
  @Input('data') vaccinations: VaccList[] = [];
  action?: string ;
  filteredVaccinations: VaccList[] = [];

constructor( private vaccListService: VaccListService ,
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<VaccinationAddEditComponent>,
@Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ) {}
ngOnInit(): void {
this.initForm();
this.vaccinationForm.patchValue(this.dialogData);
  console.log('Received data:', this.dialogData);
  }


  populateForm(vaccination: VaccList) {
    this.vaccinationForm.patchValue({
      vacNm: vaccination.vacNm,
      vaccination_Key: vaccination.vaccination_Key,
      mnf: vaccination.mnf,
      vacDrg: vaccination.vacDrg,
      vacTyp: vaccination.vacTyp,
      side_eff: vaccination.side_eff,
      targetDis:vaccination.targetDis,
      vaccinationRcrdSts :vaccination.vaccinationRcrdSts,
    });
  }
  onSubmit() {
    if (this.vaccinationForm.valid){
        this.vaccListService.createVaccination(this.vaccinationForm.value).subscribe({
          next: (val: any) => {
            alert('vaccination added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          },
        });

    }
}
initForm() {
  this.vaccinationForm = this.formBuilder.group({
    vacNm: ['', Validators.required],
    vaccination_Key: ['', Validators.required],
    vacTyp: ['', Validators.required],
    vacDrg: ['', Validators.required],
    mnf: ['', Validators.required],
    side_eff: ['', Validators.required],
    targetDis:['', Validators.required],
    vaccinationRcrdSts:['', Validators.required],
  });
}
onNoClick(): void {
  this.dialogRef.close(); // Fermer la boîte de dialogue lorsque le bouton "Cancel" est cliqué
}
closeDialog(): void {
  this.dialogRef.close(); // Appeler la méthode close() de MatDialogRef pour fermer la boîte de dialogue
}

}
