import { Component } from '@angular/core';
import { PhysicalTreatment } from './physicalTreatment.model';
import { PhysicalTreatmentService } from './physicalTreatment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from './dialog/delete/delete.component';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateComponent } from './dialog/update/update.component';

@Component({
  selector: 'app-physical-treatments-list',
  templateUrl: './physical-treatments-list.component.html',
  styleUrls: ['./physical-treatments-list.component.scss']
})
export class PhysicalTreatmentsListComponent {


  physicalTreatments: any [] = [];
  filteredPhysicalTreatments: PhysicalTreatment[] = [];


  constructor(private physicalTreatmentService: PhysicalTreatmentService,
    private fb: FormBuilder,

    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
    ) { }

    treatments: PhysicalTreatment[] = [];
    ngOnInit(): void {
    this.loadPhysicalTreatments();
    this.filteredPhysicalTreatments = this.physicalTreatments; // Initialize filtered list

  }

  loadPhysicalTreatments(): void {
    this.physicalTreatmentService.getAllPhysicalTreatments().subscribe(
      (data) => {
        console.log(data);
      this.physicalTreatments = data;
      },
      (error) => {
        console.error('Error fetching treatment, error');

    }
    );
  }

  // delete
  deleteTreatment (treatment: PhysicalTreatment){
    console.log(treatment);
    const dialogRef = this._dialog.open(DeleteComponent, {
      data: treatment,
    });
    dialogRef.afterClosed().subscribe((result: number) => {
      if(result == 1){
        this.physicalTreatmentService.deletePhysicalTreatment(treatment.physicalTreatment_Key).subscribe(
          ()=>{
            this.loadPhysicalTreatments();
          },
          (error: any) => {
            console.error('Error while deleting physical Treatment:',error);
          }
        )
      }
    })
  }

  openAddForm(){
    this._dialog.open(FormDialogComponent, {

    });
    this._dialog.afterAllClosed.subscribe(()=>{
      this.loadPhysicalTreatments();
    })
  }


  openEditForm(data: any){
    console.log(data, 'data');
    this._dialog.open(UpdateComponent, {
      data,
    });
    this._dialog.afterAllClosed.subscribe(()=>{
      this.loadPhysicalTreatments();

    })
  }

  filterPhysicalTreatments(searchValue: string): void {
    if (!searchValue) {
      this.filteredPhysicalTreatments = this.physicalTreatments; // Reset to full list if search is empty
    } else {
      searchValue = searchValue.toLowerCase();
      this.filteredPhysicalTreatments = this.physicalTreatments.filter(
        (treatment) =>
          treatment.treatmentName.toLowerCase().includes(searchValue)
      );
    }
  }

}
