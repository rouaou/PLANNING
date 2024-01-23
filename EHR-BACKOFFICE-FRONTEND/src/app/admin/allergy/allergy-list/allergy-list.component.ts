import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AllergyList } from './allergy-list.model';
import { AllergyListService } from './allergy-list.service';
import { FormDialogComponent } from 'app/calendar/dialogs/form-dialog/form-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import * as XLSX from 'xlsx';
import { DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AllergyAddEditComponent } from './allergy-add-edit/allergy-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { DeleteComponent } from './delete/delete.component';




@Component({
  selector: 'app-allergy-list',
  templateUrl: './allergy-list.component.html',
  styleUrls: ['./allergy-list.component.scss']
})
export class AllergyListComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

  selection = new SelectionModel<AllergyList>(true, []);
  @Input('data') Allergies: AllergyList[] = [];
  page = 1;
  items = 5;
  allergies: AllergyList[] = [];
  filteredAllergies: AllergyList[] = [];
  searchQuery: string = '';
  isLoading: boolean = false;
  selectedAllergy: AllergyList | null = null;
  checkedAllergy: AllergyList | undefined;
  allergyForm!: FormGroup;
  override subs: any;
  exampleDatabase?: AllergyListService;
  id?: number;
  paginator: any;
  allergy: AllergyList = {} as AllergyList;




constructor(
  private allergyListService: AllergyListService,
    private dialog: MatDialog,
     private formBuilder: FormBuilder,
     private snackBar : MatSnackBar){
    super();
    this.fetchData();
    }
  /* @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;
*/
ngOnInit(): void {
  this.getAllergies();
  this.fetchData();
  this.initForm();



}
fetchData(): void {
  this.isLoading = true;

  this.allergyListService.getAllAllergies().subscribe(
    (data: AllergyList[]) => {
      this.allergies = data;
      this.filteredAllergies = data;
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching data:', error);
      this.isLoading = false; // Assurez-vous que loading state est également réinitialisé en cas d'erreur
    }
  );
  }
  private initForm() {
      this.allergyForm = this.formBuilder.group({
        algNm: ['', Validators.required],
        algSym:[[]],
        allergy_Key: ['', Validators.required],
        algTyp: ['', Validators.required],
        algDesc: ['', Validators.required],
        algGrv: ['', Validators.required],
      });
    }

/*
    masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.allergies.forEach(row => this.selection.select(row));
    }*/

    // Returns whether all rows are selected
    /*isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.allergies.length;
      return numSelected === numRows;
    }*/




  getAllergies(): void {
    this.isLoading = true;
    this.allergyListService.getAllAllergies().subscribe(
      (allergies: AllergyList[]) => {
        this.isLoading = false;
        this.filteredAllergies = allergies;
        this.allergies = allergies;
      },
      (error) => {
        console.error('Error loading allergies:', error);
        this.isLoading = false;
      }
    );
  }


    addNew() {
      const dialogRef = this.dialog.open(AllergyAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {


        if (val) {
          // Logique à exécuter après la fermeture de la fenêtre de dialogue
          // Par exemple, vous pouvez appeler la méthode loadData() pour rafraîchir les données
          this.getAllergies();
        }
      },
    });
    }
      /*let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(AllergyAddEditComponent, {
      data: {
        allergies: this.allergies,
        action: 'add',
      },// Configurations de la fenêtre de dialogue
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result === 1) {
        // Logique à exécuter après la fermeture de la fenêtre de dialogue
        // Par exemple, vous pouvez appeler la méthode loadData() pour rafraîchir les données
        this.loadAllergies();
      }
    });
  */



  onDelete(allergy: AllergyList){

    const dialogRef = this.dialog.open(DeleteComponent, {
      data: allergy,
    });
    dialogRef.afterClosed().subscribe((result: number) => {
      if (result === 1) {
        this.allergyListService.deleteAllergy(allergy.allergy_Key).subscribe(
          ()=>{

            // Refresh the allergies list
            this.getAllergies();
            // Optionally, display a success message
          },
          (error: any) => {
            console.error('Error deleting allergy:', error);
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

  private refreshTable() {
    this.paginator?._changePageSize(this.paginator.pageSize);
  }

/***edit */
    /*let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AllergyAddEditComponent, {
      data: {
        allergies: this.filteredAllergies,
        allergy: allergy,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result: number) => {
      if (result === 1) {
        this.openSuccessSnackBar("Allergy Updated Successfully !")
      }
    });*/
    edit(data: any) {
      const dialogRef = this.dialog.open(AllergyAddEditComponent, {
        data,
      });

      dialogRef.afterClosed().subscribe((result: number) => {
        if (result === 1) {
          const updatedAllergyData: AllergyList = this.allergyForm.value;
          updatedAllergyData.allergyRcrdSts = 1;

          console.log('Updated Allergy Data:', updatedAllergyData); // Check the updated data

          this.allergyListService.updateAllergy(this.allergy.allergy_Key, updatedAllergyData).subscribe(
            (updatedAllergy: AllergyList) => {
              console.log('Allergy mise à jour :', updatedAllergy);
              this.getAllergies();
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




  hasAllergies(): boolean {
    return this.filteredAllergies.length > 0;
  }
  searchAllergies(): void {
    const query = this.searchQuery.toLowerCase();

    this.filteredAllergies = this.allergies.filter(allergy =>
       allergy.algNm.toLowerCase().includes(query) || allergy.algTyp.toLowerCase().includes(query)
    );
  }

  refresh() {
    this.getAllergies();
  }

 openSuccessSnackBar(message: string): void {
    this.snackBar.open(message,'',{
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-success"]
    });
}
  openErrorSnackBar(message: string): void {
    this.snackBar.open(message,'',{
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-error"]
    });
  }
  exportExcel(): void {
    const data = [
      // Your data to export in Excel format
      // Example:
      ['Name', 'Type', 'Symptoms','Gravity', 'Description'],
      ['jhkjh', 'hjbjh', 'jnjbh','jbhjbjh','hjvjhvjh'],

      // Add more rows as needed
    ];

  /*  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // 'Sheet1' is the sheet name

    // Generate and save the Excel file
    XLSX.writeFile(wb, 'exported_data.xlsx');*/
  }

}
