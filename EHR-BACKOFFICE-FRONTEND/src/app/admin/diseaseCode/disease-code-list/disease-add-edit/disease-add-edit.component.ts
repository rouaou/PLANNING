import { Component, Inject, Input, OnInit } from '@angular/core';
import { DiseaseCodeList } from '../disease-code-list.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiseaseCodeService } from '../disease-code.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  id : number;
  action: string;
  Code: DiseaseCodeList;
}
@Component({
  selector: 'app-disease-add-edit',
  templateUrl: './disease-add-edit.component.html',
  styleUrls: ['./disease-add-edit.component.scss']
})
export class DiseaseAddEditComponent implements OnInit{
  ngOnInit(): void {
    this.initForm();
  this.codeForm.patchValue(this.dialogData);
  console.log('Received data:', this.dialogData);
  }
  codeForm!: FormGroup;
  code: DiseaseCodeList = {} as DiseaseCodeList;
  isLoading: boolean = false;
  dialogTitle?: string;
  @Input('data') codes: DiseaseCodeList[] = [];
  action?: string ;
  filteredCodes: DiseaseCodeList[] = [];
  Codes: DiseaseCodeList[]= [];


constructor(
  private diseaseCodeService: DiseaseCodeService,
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<DiseaseAddEditComponent>,
@Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ){}


  onSubmit() {
    if (this.codeForm.valid){

        this.diseaseCodeService.createCode(this.codeForm.value).subscribe({
          next: (val: any) => {
            alert('Code added successfully');
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
populateForm(Code: DiseaseCodeList) {
  this.codeForm.patchValue({
    disease_Key: Code.disease_Key,
    subCategory: Code.subCategory,
    chapter: Code.chapter,
    category: Code.category,
    bloc: Code.bloc,
    code: Code.code,
    name: Code.name,
    diseaseCodeRcrdSts:Code.diseaseCodeRcrdSts,
  });
}

closeDialog(): void {
  this.dialogRef.close(); // Appeler la méthode close() de MatDialogRef pour fermer la boîte de dialogue
}

initForm() {
  this.codeForm = this.formBuilder.group({
    disease_Key: ['', Validators.required],
    subCategory: ['', Validators.required],
    chapter: ['', Validators.required],
    category: ['', Validators.required],
    bloc: ['', Validators.required],
    code: ['', Validators.required],
    name: ['', Validators.required],
    diseaseCodeRcrdSts:['', Validators.required],
  });
}
fetchData(): void {
  this.isLoading = true;

  this.diseaseCodeService.getAllCodes().subscribe(
    (data: DiseaseCodeList[]) => {
      this.codes = data;
      this.filteredCodes = data; // Assurez-vous que la propriété filteredInsurances est définie dans votre composant
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching data:', error);
      this.isLoading = false; // Assurez-vous que loading state est également réinitialisé en cas d'erreur
    }
  );
  }
}
