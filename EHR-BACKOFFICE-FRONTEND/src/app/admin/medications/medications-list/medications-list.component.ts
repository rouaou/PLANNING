import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MedicationsService } from './medications.service';
import { FormComponent } from './dialog/form/form.component';
import { Medication } from './medication.model';
import { DeleteComponent } from './dialog/delete/delete.component';
import { UpdateComponent } from './dialog/update/update.component';
import { Direction } from '@angular/cdk/bidi';
//import { UpdateComponent } from './dialog/update/update.component';
@Component({
  selector: 'app-medications-list',
  templateUrl: './medications-list.component.html',
  styleUrls: ['./medications-list.component.scss']
})
export class MedicationsListComponent {
  page = 1;
  items = 0;
  medications: any[] = [];


  filteredMedications: any[] = [];
  searchQuery: any;

  //medication!: Medication | null;

  constructor(private medicationsService: MedicationsService,
    private _dialog: MatDialog,
  ) { }

  openAddForm() {
    const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

    this._dialog.open(FormComponent, {
      data: {
        medications: this.medications
      },
      direction: tempDirection,
    });
  }

  loadMedications(): void {
    this.medicationsService.getAllMedications().subscribe(
      (data: any[]) => {
        console.log(data);
        this.medications = data;
        this.filterMedications();
      },
      (error: any) => {
        console.error('Error fetching medications, error');

      }
    )
  }

  ngOnInit() {
    this.loadMedications();

  }

  deleteMedication(medication: Medication) {
    console.log(medication);
    //console.log(category.physicalTreatmentCategory_Key);

    const dialogRef = this._dialog.open(DeleteComponent, {
      data: medication,
    });
    dialogRef.afterClosed().subscribe((result: number) => {
      if (result == 1) {
        this.medicationsService.deleteMedicationById(medication.medication_Key).subscribe(
          () => {
            this.loadMedications();
          },
          (error: any) => {
            console.error('Error while deleting medication:', error);
          }
        )
      }
    })
  }



  openEditForm(data: Medication) {
    console.log(data, 'dataaaaa aaaaa');
    this._dialog.open(UpdateComponent, {
      data,
    });
  }

  //filteredMedications: any[]=this.medicationsService.getAllMedications();
  searchMedication(): void {
    //this.filteredMedications= this.medicationsService.getAllMedications().filter(medication =>medication.)
  }

  filterMedications() {
    const searchTerm = this.searchQuery ? this.searchQuery.toLowerCase() : '';

    if (!searchTerm) {
      // If the search query is empty, show all medications
      this.filteredMedications = this.medications;
      return;
    }

    this.filteredMedications = this.medications.filter((medicationss) => {
      return (
        medicationss.name.toLowerCase().includes(searchTerm) ||
        medicationss.code.toLowerCase().includes(searchTerm)
      );
    });
  }



}


