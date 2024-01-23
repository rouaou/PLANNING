import { Component, OnInit } from '@angular/core';
import { DiseaseCodeList } from './disease-code-list.model';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { DiseaseCodeService } from './disease-code.service';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiseaseAddEditComponent } from './disease-add-edit/disease-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-disease-code-list',
  templateUrl: './disease-code-list.component.html',
  styleUrls: ['./disease-code-list.component.scss']
})
export class DiseaseCodeListComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  searchQuery: string ='';
  filteredCodes : DiseaseCodeList[] = [];
  codes : DiseaseCodeList[] = [];
  paginator: any;
  isLoading: boolean = false;
  page = 1;
  items = 5;
  codeForm!:FormGroup;
  code: DiseaseCodeList = {} as DiseaseCodeList;

constructor(private diseaseCodeService : DiseaseCodeService,
  public formBuilder: FormBuilder,
  private dialog: MatDialog,
  private snackBar : MatSnackBar
  ){
  super()
}

ngOnInit() : void{
this.getCodes();
this.initForm();
this.fetchData();
}

searchCodes(): void {
  const query = this.searchQuery.toLowerCase();

  this.filteredCodes = this.codes.filter(code =>
     code.category.toLowerCase().includes(query) || code.chapter.toLowerCase().includes(query)|| code.subCategory.toLowerCase().includes(query) || code.bloc.toLowerCase().includes(query)
     );
}
private initForm() {
  this.codeForm = this.formBuilder.group({
    disease_Key: ['', Validators.required],
    chapter: ['', Validators.required],
    category: ['', Validators.required],
    subCategory: ['', Validators.required],
    bloc: ['', Validators.required],
    code: ['', Validators.required],
    name: ['', Validators.required],
    diseaseCodeRcrdSts: ['', Validators.required],
  });
}

addNew() {
  const dialogRef = this.dialog.open(DiseaseAddEditComponent);
  dialogRef.afterClosed().subscribe({
    next: (val) => {


    if (val) {
      // Logique à exécuter après la fermeture de la fenêtre de dialogue
      // Par exemple, vous pouvez appeler la méthode loadData() pour rafraîchir les données
      this.getCodes();
    }
  },
});
}


private refreshTable() {
  this.paginator?._changePageSize(this.paginator.pageSize);
}
refresh() {
  this.getCodes();
}

getCodes(): void {
  this.isLoading = true;
  this.diseaseCodeService.getAllCodes().subscribe(
    (codes: DiseaseCodeList[]) => {
      this.isLoading = false;
      this.filteredCodes = codes;
      this.codes = codes;
    },
    (error) => {
      console.error('Error loading allergies:', error);
      this.isLoading = false;
    }
  );
}
exportExcel(): void {
  const data = [
    // Your data to export in Excel format
    // Example:
    ['Name', 'Type', 'Symptoms'],
    ['John', 25, 'New York'],
    ['Alice', 30, 'Los Angeles'],
    // Add more rows as needed
  ];

  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // 'Sheet1' is the sheet name

  // Generate and save the Excel file
  XLSX.writeFile(wb, 'exported_data.xlsx');
}
hasCodes(): boolean {
  return this.filteredCodes.length > 0;
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


  edit(data: any) {
    const dialogRef = this.dialog.open(DiseaseAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result === 1) {
        const updatedCodeData: DiseaseCodeList = this.codeForm.value;
        updatedCodeData.diseaseCodeRcrdSts = 1;

        console.log('Updated Code Data:', updatedCodeData); // Check the updated data

        this.diseaseCodeService.updateCode(this.code.disease_Key, updatedCodeData).subscribe(
          (updatedCode: DiseaseCodeList) => {
            console.log('Allergy mise à jour :', updatedCode);
            this.getCodes();
            this.refreshTable();
            this.fetchData();
            this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );

          },
          error => {
            console.error('Erreur lors de la mise à jour de', error);
            // Handle the error here
          }
        );
      }
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  onDelete(code: DiseaseCodeList){

    const dialogRef = this.dialog.open(DeleteComponent, {
      data: code,
    });
    dialogRef.afterClosed().subscribe((result: number) => {
      if (result === 1) {
        this.diseaseCodeService.deleteCode(code.disease_Key).subscribe(
          ()=>{

            // Refresh the allergies list
            this.getCodes();
            // Optionally, display a success message
          },
          (error: any) => {
            console.error('Error deleting allergy:', error);
          }
        );
      }
    });
}

          uploadFile(event: any) {

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
            /*const files: FileList | null = event.target.files;*/


            if (!fileInput) {
              this.snackBar.open('No file selected.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: 'error-snackbar',
              });
              return;
            }



            
      }








    }
