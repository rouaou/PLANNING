import { Component, OnInit } from '@angular/core';
import { VaccList } from './vacc-list.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { VaccinationModule } from '../vaccination.module';
import { VaccListService } from './vacc-list.service';
import { DeleteComponent } from './delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { VaccinationAddEditComponent } from './vaccination-add-edit/vaccination-add-edit.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vacc-list',
  templateUrl: './vacc-list.component.html',
  styleUrls: ['./vacc-list.component.scss']
})
export class VaccListComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  filteredVaccinations: VaccList[] = [];
  page = 1;
  items = 5;
  vaccinationForm!: FormGroup;
  searchQuery: string = '';
  vaccinations: VaccList[] = [];
  isLoading: boolean = false;
  paginator: any;
  vaccination: any;




  constructor(private dialog: MatDialog, private vaccListService: VaccListService ,private formBuilder: FormBuilder, private snackBar : MatSnackBar) {
    super()
  }

  ngOnInit(): void {
    this.getVaccinations();
    this.initForm();
    this.fetchData();
  }



    hasVaccinations(): boolean {
    return this.filteredVaccinations.length > 0;
  }




  private initForm() {
    this.vaccinationForm = this.formBuilder.group({
      vacNm: ['', Validators.required],
      vaccination_Key: ['', Validators.required],
      VacDrg: ['', Validators.required],
      Mnf: ['', Validators.required],
      Side_eff: ['', Validators.required],
      vacTyp: ['', Validators.required],
      targetDis:['', Validators.required],
      VaccinationRcrdSts: ['', Validators.required],
    });
  }


  getVaccinations(): void {
    /*this.isLoading = true;*/
    this.vaccListService.getAllVaccinations().subscribe(
      (vaccinations: VaccList[]) => {
        /*this.isLoading = false;*/
        this.filteredVaccinations = vaccinations;
        this.vaccinations = vaccinations;
      },
      (error: any) => {
        console.error('Error loading allergies:', error);
        /*this.isLoading = false;*/
      }
    );
  }
  searchVaccinations(): void {
    const query = this.searchQuery.toLowerCase();

    this.filteredVaccinations = this.vaccinations.filter(vaccination =>
       vaccination.vacNm.toLowerCase().includes(query) || vaccination.vacTyp.toLowerCase().includes(query)
    );
  }
  addNew() {
    const dialogRef = this.dialog.open(VaccinationAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {


      if (val) {
        // Logique à exécuter après la fermeture de la fenêtre de dialogue
        // Par exemple, vous pouvez appeler la méthode loadData() pour rafraîchir les données
        this.getVaccinations();
      }
    },
  });
  }

refresh() {
  this.getVaccinations();
}
onDelete(vaccination: VaccList){

  const dialogRef = this.dialog.open(DeleteComponent, {
    data: vaccination,
  });
  dialogRef.afterClosed().subscribe((result: number) => {
    if (result === 1) {
      this.vaccListService.deleteVaccination(vaccination.vaccination_Key).subscribe(
        ()=>{

          // Refresh the allergies list
          this.getVaccinations();
          // Optionally, display a success message
        },
        (error: any) => {
          console.error('Error deleting allergy:', error);
        }
      );
    }
  });
      }

      fetchData(): void {
        this.isLoading = true;

        this.vaccListService.getAllVaccinations().subscribe(
          (data: VaccList[]) => {
            this.vaccinations = data;
            this.filteredVaccinations = data; // Assurez-vous que la propriété filteredInsurances est définie dans votre composant
            this.isLoading = false;
          },
          (error: any) => {
            console.error('Error fetching data:', error);
            this.isLoading = false; // Assurez-vous que loading state est également réinitialisé en cas d'erreur
          }
        );
        }

        edit(data: any) {
          const dialogRef = this.dialog.open(VaccinationAddEditComponent, {
            data,
          });

          dialogRef.afterClosed().subscribe((result: number) => {
            if (result === 1) {
              const updatedVaccinationData: VaccList = this.vaccinationForm.value;
              updatedVaccinationData.vaccinationRcrdSts = 1;

              console.log('Updated Vaccination Data:', updatedVaccinationData); // Check the updated data

              this.vaccListService.updateVaccination(this.vaccination.vaccination_Key, updatedVaccinationData).subscribe(
                (updatedVaccination: VaccList) => {
                  console.log('Vaccination mise à jour :', updatedVaccination);
                  this.getVaccinations();
                  this.refreshTable();
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

        private refreshTable() {
          this.paginator?._changePageSize(this.paginator.pageSize);
        }

}
