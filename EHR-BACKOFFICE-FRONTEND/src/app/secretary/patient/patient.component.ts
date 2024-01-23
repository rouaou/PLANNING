import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from './patient.model';
import { PatientService } from './patient.service';
import { Direction } from '@angular/cdk/bidi';
import { FormPatientDialogComponent } from './dialog/form-patient-dialog/form-patient-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { EditPatientComponent } from './dialog/edit-patient/edit-patient.component';
import { DeletePatientDialogComponent } from './dialog/delete-patient-dialog/delete-patient.component';
import { AuthService, User } from '@core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  @Input('data') Patients:Patient[]=[];
  filteredPatients: Patient[] = [];
  searchQuery = '';

  Patient: Patient| undefined;
  isLoading: boolean = false;
  currentUser: User;

  constructor(
    private _dialog: MatDialog,
    private snackBar: MatSnackBar,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private authService: AuthService
    ) {
      this.currentUser = this.authService.currentUserValue;
    }

  ngOnInit(): void {
    this.getPatients();

  }

  displayPatients(): void {
    this.isLoading = true;

  }



  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-success"]
    });
  }
  refresh() {
    this.displayPatients();
  }
  openAddEditForm() {
   const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

   const dialogRef = this._dialog.open(FormPatientDialogComponent, {
     data: {

     },
     direction: tempDirection,
   });

   dialogRef.afterClosed().subscribe((result) => {

     if (result === 1) {
       this.openSuccessSnackBar("Patient Added Successfully!");
       //this.getCategories();

     }this.loadPatient();
     this.refresh();
   });
  }
  openEditForm(data: Patient){
    this._dialog.open(EditPatientComponent, {
      data,
    });
  }
  private getPatients(){
    this.patientService.getAllPatient().subscribe(data => {
      // data is a response data and we assign it to the categories property
      this.Patients = data;
    })

  }

  DeletePatient(patient: Patient){
    console.log(patient);
    console.log(patient.userKy);
    const dialogRef = this._dialog.open(DeletePatientDialogComponent, {
      data:patient,
    });
    dialogRef.afterClosed().subscribe((result: number) => {
      if(result == 1){
        this.patientService.deletePatient(patient.userKy).subscribe(
          () => {
            console.log('Patient deleted successfully.');
            this.getPatients();
            this.loadPatient();
            this.refresh();
          },
          (error) => {
            console.error('Error while deleting patient:', error);
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            }
           }
    )}}

  )}

  searchPatients(): void {
  this.filteredPatients = this.Patients.filter(patient =>
    patient.firstName.toLowerCase().includes(this.searchQuery.toLowerCase())

    );
}
  loadPatient(): void {
    this.patientService.getAllPatient().subscribe(
      (data) => {
        console.log(data);
      this.Patients = data;
      },
      (error) => {
        console.error('Error fetching patient, error');
    }
    );
  }
}
