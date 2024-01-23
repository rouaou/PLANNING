import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllergyList } from '../allergy-list.model';
import { AllergyListService } from '../allergy-list.service';
import {MatSelectModule} from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SymptomsList } from '../symptoms-add-edit/symptoms.model';
import { SymptomsAddEditComponent } from '../symptoms-add-edit/symptoms-add-edit.component';
import { SymptomsService } from '../symptoms-add-edit/symptoms.service';
export interface DialogData {
  id : number;
  action: string;
  Allergy: AllergyList;
}
@Component({
  selector: 'app-allergy-add-edit',
  templateUrl: './allergy-add-edit.component.html',
  styleUrls: ['./allergy-add-edit.component.scss'],

})
export class AllergyAddEditComponent implements OnInit {
  allergyForm!: FormGroup;
  allergy: AllergyList = {} as AllergyList;
  isLoading: boolean = false;
  dialogTitle?: string;
  @Input('data') Allergies: AllergyList[] = [];
  action?: string ;
  filteredAllergies: AllergyList[] = [];
  allergies: AllergyList[]= [];

  algSym = new FormControl('');

  symptomList: SymptomsList[]=[];
  symptomsNames : string[]=[];
  symptoms: SymptomsList[] = [];

constructor(
  private allergyListService: AllergyListService ,
  private symptomsService: SymptomsService,
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<AllergyAddEditComponent>,
  private _dialog: MatDialog,


@Inject(MAT_DIALOG_DATA) public dialogData: DialogData,

  ){}

ngOnInit(): void{
  this.initForm();
  /*this.action = this.dialogData.action;
  if (this.dialogData.action === 'edit' && this.dialogData.Allergy) {
    this.allergy  = this.dialogData.Allergy;
    this.populateForm(this.dialogData.Allergy);
  }*/
  this.allergyForm.patchValue(this.dialogData);
  console.log('Received data:', this.dialogData);
}



populateForm(Allergy: AllergyList) {
  this.allergyForm.patchValue({
    algNm: Allergy.algNm,
    algSym: Allergy.algSym,
    allergy_Key: Allergy.allergy_Key,
    algDesc: Allergy.algDesc,
    algGrv: Allergy.algGrv,
    algTyp: Allergy.algTyp,
    allergyRcrdSts:Allergy.allergyRcrdSts,
  });
}

closeDialog(): void {
  this.dialogRef.close(); // Appeler la méthode close() de MatDialogRef pour fermer la boîte de dialogue
}

initForm() {
  this.allergyForm = this.formBuilder.group({
    algNm: ['', Validators.required],
    allergy_Key: ['', Validators.required],
    algSym: [[]],
    algTyp: ['', Validators.required],
    algDesc: ['', Validators.required],
    algGrv: ['', Validators.required],
    allergyRcrdSts:['', Validators.required],
  });
}
onSubmit() {
  if (this.allergyForm.valid){

      this.allergyListService.createAllergy(this.allergyForm.getRawValue()).subscribe({
        next: (val: any) => {
          alert('Allergy added successfully');
          this.dialogRef.close(true);
        },
        error: (err: any) =>{
          console.error(err);
        },
      });

  }


  /*if (this.allergyForm.valid) {
    const formData = this.allergyForm.value;
    if (this.action === 'add') {
      this.allergyListService.createAllergy(formData).subscribe(
        (newAllergy: AllergyList) => {
          // Update the list of allergies in AllergyListComponent
          this.dialogRef.close(newAllergy);
        },
        (error) => {
          console.error('Error adding allergy:', error);
        }
      );
    }
  }*/

  /*if (this.allergyForm.valid){
    if(this.dialogData) {
      this.allergyListService.updateAllergy(this.dialogData.id, this.allergyForm.value).subscribe({
        next: (val: any) => {
          alert('Allergy updated successfully');
          this.dialogRef.close(true);
        },
        error: (err: any) =>{
          console.error(err);
        },
      });
    }else {
      this.allergyListService.createAllergy( this.allergyForm.value).subscribe({
        next: (val: any) => {
          alert('Allergy updated successfully');
          this.dialogRef.close(true);
        },
        error: (err: any) =>{
          console.error(err);
        },
      });
    }
  }*/
}





/*updateAllergy() {
  // Mettre à jour les données d'assurance existantes ici
  const updatedAllergyData: AllergyList = this.allergyForm.value;
  updatedAllergyData.allergyRcrdSts = 1;
  // Assurez-vous que insuranceUnxTmCrt et insuranceUnxTmUpdt ont des valeurs par défaut

  // Mettez à jour l'assurance en appelant le service
  this.allergyListService.updateAllergy(this.allergy.allergy_Key, updatedAllergyData).subscribe(
    (updatedAllergy: AllergyList) => {
      console.log('Allergy mise à jour :', updatedAllergy);
      this.dialogRef.close(1);
      this.fetchData();
    },
    error => {
      console.error('Erreur lors de la mise à jour de l\'assurance :', error);
      // Gérez l'erreur ici
    }
  );
}
/*dialogTitle: any;
submit: any;*/
/*confirmAdd() {
  if (this.allergyForm.valid) {
    const newAllergy: AllergyList = this.allergyForm.value;
    newAllergy.allergyRcrdSts = 1;
      console.log('New allergy to add:', newAllergy);
      newAllergy.allergy_Key = Math.floor(Math.random() * 1000);
    newAllergy.allergyRcrdSts = 1;
      this.allergyListService.createAllergy(newAllergy).subscribe(
        (createdAllergy) => {
          console.log('New allergy added:', createdAllergy);
          this.dialogRef.close(1);
          this.fetchData();
        },
        error => {
          console.error('Error adding allergy:', error);
        }
      );
    } else {
      console.log('Invalid form. Please check the fields.');
    }*/

  /*this.allergyListService.createAllergy(this.allergyForm.getRawValue());*/

/*
fetchData(): void {
  this.isLoading = true;

  this.allergyListService.getAllAllergies().subscribe(
    (data: AllergyList[]) => {
      this.Allergies = data;
      this.filteredAllergies = data; // Assurez-vous que la propriété filteredInsurances est définie dans votre composant
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching data:', error);
      this.isLoading = false; // Assurez-vous que loading state est également réinitialisé en cas d'erreur
    }
  );
  }*/
refresh() {
  this.fetchData();
}
fetchData(): void {
  this.isLoading = true;

  this.allergyListService.getAllAllergies().subscribe(
    (data: AllergyList[]) => {
      this.allergies = data;
      this.filteredAllergies = data; // Assurez-vous que la propriété filteredInsurances est définie dans votre composant
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching data:', error);
      this.isLoading = false; // Assurez-vous que loading state est également réinitialisé en cas d'erreur
    }
  );
  }

onNoClick(): void {
  this.dialogRef.close(); // Fermer la boîte de dialogue lorsque le bouton "Cancel" est cliqué
}


openSymptomForm(){
  this._dialog.open(SymptomsAddEditComponent)
}
onCloseClick(): void {
// You can optionally pass data back to the component that opened the dialog
this.dialogRef.close(/* optional data to pass back */);
}


loadSymptoms(){
this.symptomsService.getAllSymptoms().subscribe((response) => {
  this.symptomList = response;

  this.symptomsNames = this.symptomList.map(symptoms => symptoms.symName);

  this.symptoms = this.symptomList.map(symptoms => symptoms);

  console.log('symptoms names:', this.symptomsNames);

},
(error)=> {
  console.error('Error getting symptoms:', error);
}
);
}

onSymptomsSelectionChange() {
const selectedIds = this.algSym.value;
this.allergyForm.get('Symptoms')?.setValue(selectedIds);
return selectedIds;
// console.log("selecteeed idss",selectedIds);
}


}
