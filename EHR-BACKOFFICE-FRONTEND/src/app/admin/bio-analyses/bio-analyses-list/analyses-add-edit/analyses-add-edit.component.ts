import { Component, Input,Inject, OnInit } from '@angular/core';
import { BioAnalysesList } from '../bio-analyses.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BioAnalysesService } from '../bio-analyses.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  id : number;
  action: string;
  Analyse: BioAnalysesList;
}
@Component({
  selector: 'app-analyses-add-edit',
  templateUrl: './analyses-add-edit.component.html',
  styleUrls: ['./analyses-add-edit.component.scss']
})
export class AnalysesAddEditComponent implements OnInit {
analyseForm!: FormGroup;
@Input('data') Analyses: BioAnalysesList[] = [];
dialogTitle?: string;
analyse: BioAnalysesList = {} as BioAnalysesList;

constructor(private bioAnalysesService: BioAnalysesService,
  public dialogRef: MatDialogRef<AnalysesAddEditComponent>,
  private formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ){}

ngOnInit(): void {
this.initForm();
this.analyseForm.patchValue(this.dialogData);
  console.log('Received data:', this.dialogData);
   }
   initForm() {
    this.analyseForm = this.formBuilder.group({
      ansNm: ['', Validators.required],
      analyse_Key: ['', Validators.required],
      unitMesure: ['', Validators.required],
      minRef: ['', Validators.required],
      maxRef: ['', Validators.required],
      bioAnsTyp: ['', Validators.required],
      bioAnsDesc: ['', Validators.required],
      analyseRcrdSts:['', Validators.required],
    });
  }
  populateForm(Analyses: BioAnalysesList) {
    this.analyseForm.patchValue({
      ansNm: Analyses.ansNm,
      analyse_Key: Analyses.analyse_Key,
      unitMesure: Analyses.unitMesure,
      minRef: Analyses.minRef,
      maxRef: Analyses.maxRef,
      bioAnsTyp: Analyses.bioAnsTyp,
      bioAnsDesc: Analyses.bioAnsDesc,
      analyseRcrdSts:Analyses.analyseRcrdSts,
    });
  }

  onSubmit() {
    if (this.analyseForm.valid){

        this.bioAnalysesService.createAnalyse(this.analyseForm.value).subscribe({
          next: (val: any) => {
            alert('Analyse added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          },
        });

    }
}
onNoClick(): void {
  this.dialogRef.close(); // Fermer la boîte de dialogue lorsque le bouton "Cancel" est cliqué
}

closeDialog(): void {
  this.dialogRef.close(); // Appeler la méthode close() de MatDialogRef pour fermer la boîte de dialogue
}

}
