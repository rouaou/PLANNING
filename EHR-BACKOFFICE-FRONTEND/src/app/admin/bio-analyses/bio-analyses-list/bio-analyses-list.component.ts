import { Component, Input, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BioAnalysesList } from './bio-analyses.model';
import { BioAnalysesService } from './bio-analyses.service';
import { MatDialog } from '@angular/material/dialog';
import { AnalysesAddEditComponent } from './analyses-add-edit/analyses-add-edit.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-bio-analyses-list',
  templateUrl: './bio-analyses-list.component.html',
  styleUrls: ['./bio-analyses-list.component.scss']
})
export class BioAnalysesListComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  @Input('data') Analyses: BioAnalysesList[] = [];

filteredAnalyses : BioAnalysesList[]= [];
searchQuery: string = '';
analyses: BioAnalysesList[] = [];
isLoading: boolean = false;
page = 1;
items = 5;
paginator: any;
analyseForm!: FormGroup;
analyse: BioAnalysesList = {} as BioAnalysesList;

constructor(private bioAnalysesService: BioAnalysesService, private dialog: MatDialog,
  private formBuilder: FormBuilder,
  private snackBar : MatSnackBar){
  super()
  this.fetchData();
}

  ngOnInit(): void {
this.getAnalyses();
this.fetchData();
this.initForm();
this.refreshTable();
  }

  fetchData(): void {
    this.isLoading = true;

    this.bioAnalysesService.getAllAnalyses().subscribe(
      (data: BioAnalysesList[]) => {
        this.analyses = data;
        this.filteredAnalyses = data; // Assurez-vous que la propriété filteredInsurances est définie dans votre composant
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.isLoading = false; // Assurez-vous que loading state est également réinitialisé en cas d'erreur
      }
    );
    }

      private initForm() {
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
  private refreshTable() {
    this.paginator?._changePageSize(this.paginator.pageSize);
  }

  searchAnalyses(): void {
    const query = this.searchQuery.toLowerCase();

    this.filteredAnalyses = this.analyses.filter(analyse =>
       analyse.ansNm.toLowerCase().includes(query) || analyse.bioAnsTyp.toLowerCase().includes(query)
    );
  }
  addNew() {
    const dialogRef = this.dialog.open(AnalysesAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {


      if (val) {
        // Logique à exécuter après la fermeture de la fenêtre de dialogue
        // Par exemple, vous pouvez appeler la méthode loadData() pour rafraîchir les données
        this.getAnalyses();
      }
    },
  });
  }


refresh() {
  this.getAnalyses();
}


getAnalyses(): void {
  this.isLoading = true;
  this.bioAnalysesService.getAllAnalyses().subscribe(
    (analyses: BioAnalysesList[]) => {
      this.isLoading = false;
      this.filteredAnalyses = analyses;
      this.analyses = analyses;
    },
    (error) => {
      console.error('Error loading allergies:', error);
      this.isLoading = false;
    }
  );
}
hasAnalyses(): boolean {
  return this.filteredAnalyses.length > 0;
}

onDelete(analyse: BioAnalysesList){

  const dialogRef = this.dialog.open(DeleteComponent, {
    data: analyse,
  });
  dialogRef.afterClosed().subscribe((result: number) => {
    if (result === 1) {
      this.bioAnalysesService.deleteAnalyse(analyse.analyse_Key).subscribe(
        ()=>{

          // Refresh the allergies list
          this.getAnalyses();
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

    edit(data: any) {
      const dialogRef = this.dialog.open(AnalysesAddEditComponent, {
        data,
      });

      dialogRef.afterClosed().subscribe((result: number) => {
        if (result === 1) {
          const updatedAnalyseData: BioAnalysesList = this.analyseForm.value;
          updatedAnalyseData.analyseRcrdSts = 1;

          console.log('Updated Allergy Data:', updatedAnalyseData); // Check the updated data

          this.bioAnalysesService.updateAnalyse(this.analyse.analyse_Key, updatedAnalyseData).subscribe(
            (updatedAnalyse) => {
              console.log('Analyse mise à jour :', updatedAnalyse);
              this.getAnalyses();
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
}
