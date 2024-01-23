import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CalendarService } from '../../calendar.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Calendar } from '../../calendar.model';
import { AppointmentService } from 'app/admin/appointmentAdmin/appointment.service';
import { Patient } from 'app/admin/patient/patient.model';
import { PatientService } from 'app/admin/patient/patient.service';
import { Staff } from 'app/admin/staffs/staffs.model';
import { StaffsService } from 'app/admin/staffs/staffs.service';
import { Appointment } from 'app/admin/appointmentAdmin/appointment.model';

export interface DialogData {
  id: number;
  action: string;
  calendar: Calendar;
}

@Component({
  selector: 'app-form-dialog:not(o)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  calendarForm: UntypedFormGroup;
  calendar: Calendar;
  showDeleteBtn = false;
  Patients: Patient[]=[];
  PatientNames: string[] = [];
  staffs: Staff[]=[];
  StaffNames: string[] = [];
  appointmentForm: FormGroup; // Create a form group for the appointment data


  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public calendarService: CalendarService,
    public appointmentService: AppointmentService,
    public patientService: PatientService,
    public staffService: StaffsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.calendar.title;
      this.calendar = data.calendar;
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'New appointment';
      const blankObject = {} as Calendar;
      this.calendar = new Calendar();
      this.showDeleteBtn = false;
    }

    this.calendarForm = this.createContactForm();

  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  ngOnInit(){
    this.loadpatient();
    this.loadstaffs() ;
      }


      loadpatient() {
        this.patientService.getAllPatient().subscribe((response) => {
          this.Patients = response;

          this.PatientNames = this.Patients.map(patient => patient.firstName);

          this.Patients = this.Patients.map(patient => patient);

          console.log('patient names:', this.PatientNames);

        },
          (error) => {
            console.error('Error getting patients:', error);
          }
        );
      }
      loadstaffs() {
        this.staffService.getAllStaffs().subscribe((response) => {
          this.staffs = response;

          this.StaffNames = this.staffs.map(staff => staff.firstName);

          this.staffs = this.staffs.map(staff => staff);

          console.log('staff names:', this.StaffNames);

        },
          (error) => {
            console.error('Error getting staffs:', error);
          }
        );
      }
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      title: [this.calendar.title, [Validators.required]],
      startDate: [this.calendar.startDate, [Validators.required]],
      endDate: [this.calendar.endDate, [Validators.required]],
      details: [this.calendar.details],
      patient: [this.calendar.patient, [Validators.required]],
      staff: [this.calendar.staff, [Validators.required]],

    });
  }
  submit() {
    // emppty stuff
  }
  deleteEvent() {
    this.calendarService.deleteCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('delete');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.appointmentForm.valid) {
      const appointmentData: Appointment = this.appointmentForm.value;
      this.appointmentService.createAppointment(appointmentData).subscribe((data) => {
        console.log('Appointment created:', data);
        // You can handle the response as needed (e.g., show a success message, navigate to another page).
      });
    }
  }
    // this.calendarService.addUpdateCalendar(this.calendarForm.getRawValue());
    // this.dialogRef.close('submit');
  }

