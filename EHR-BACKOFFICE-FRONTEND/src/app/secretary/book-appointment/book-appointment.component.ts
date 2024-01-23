import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Appointment } from 'app/admin/appointmentAdmin/appointment.model';
import { AppointmentService } from 'app/admin/appointmentAdmin/appointment.service';
import { PatientService } from '../patient/patient.service';
import { StaffsService } from 'app/admin/staffs/staffs.service';
import { Patient } from '../patient/patient.model';
import { Service } from 'app/admin/structure/service/service.model';
import { Staff } from 'app/admin/staffs/staffs.model';
import { DatePipe } from '@angular/common';
import { EquipmentService } from 'app/admin/structure/material-resource/equipment/equipment.service';
import { Equipment } from 'app/admin/structure/material-resource/equipment/equipment.model';
import { CategoryAppoint } from 'app/admin/appointmentAdmin/appointment.enum';
import { ServiceService } from 'app/admin/structure/service/service.service';

@Component({

  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent {
  appointmentForm: FormGroup;
  appointment: Appointment;
  services: Service[] = [];
  ServiceNames: string[] = [];
  Patients: Patient[] = [];
  PatientNames: string[] = [];
  staffs: Staff[] = [];
  StaffNames: string[] = [];
  appointments: Appointment[] = [];
  Equipments: Equipment[] = [];
  EquipmentNames: string[] = [];


  constructor(

    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private appointmentservice: AppointmentService,
    private patientService: PatientService,
    private staffService: StaffsService,
    private equipementService: EquipmentService,
    private serviceService: ServiceService,
    private datePipe: DatePipe  // Add this line





  ) {
    this.appointmentForm = this.formBuilder.group({
      title: ['', Validators.required],
      categoryAppoint: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      details: ['', Validators.required],
      patient: ['', Validators.required],
      staff: ['', Validators.required],
      service: [null],
      equipment: [null], // Set initial value to null
    });




  }




  ngOnInit() {
    this.loadpatient();
    this.loadstaffs();
    this.loadequip();
    this.getAppointments();
    this.loadservices();


  }
  onServiceChange() {
    // Get the selected service from the form
    const selectedService = this.appointmentForm.get('service').value as Service;

    if (selectedService) {
      // Call your service to get the equipment for the selected service
      this.equipementService.getEquipmentByServiceId(selectedService.serviceKy).subscribe(
        (response) => {
          // Update the 'Equipments' property with the filtered list
          this.Equipments = response;

          // Optionally, you can update the 'EquipmentNames' property if needed
          this.EquipmentNames = this.Equipments.map(equipment => equipment.equipmentLabel);
        },
        (error) => {
          console.error('Error getting equipment for the selected service:', error);
          // Handle error as needed
        }
      );
    }
  }
  getAppointments() {
    this.appointmentservice.retrieveAppointment().subscribe((data) => {
      this.appointments = data;

    })
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

  loadequip() {
    this.equipementService.getAllEquipments().subscribe((response) => {
      this.Equipments = response;

      this.EquipmentNames = this.Equipments.map(equipment => equipment.equipmentLabel);

      this.Equipments = this.Equipments.map(equipment => equipment);

      console.log('equipment names:', this.EquipmentNames);

    },
      (error) => {
        console.error('Error getting patients:', error);
      }
    );
  }
  loadservices() {
    this.serviceService.getAllServices().subscribe((response) => {
      this.services = response;
      this.ServiceNames = this.services.map(service => service.serviceNm);

      this.services = this.services.map(service => service);

    },
      (error) => {
        console.error('Error getting services:', error);
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
  submit() {
    // emppty stuff
  }
  confirmAdd() {
    const appointment: Partial<Appointment> = {
      title: this.appointmentForm.get('title').value,
      categoryAppoint: this.appointmentForm.get('categoryAppoint').value,
      startDate: new Date(Number(this.appointmentForm.get('startDate').value)),
      endDate: new Date(Number(this.appointmentForm.get('endDate').value)),
      details: this.appointmentForm.get('details').value,
      patient: this.appointmentForm.get('patient').value,
      staff: this.appointmentForm.get('staff').value,
      equipment: this.appointmentForm.get('equipment').value,
      service: this.appointmentForm.get('service').value,
      status: 0
    };



    if (this.disponibility(appointment) && this.appointmentForm.get('categoryAppoint').value === 'normal') {
      this.appointmentservice.createAppointment(appointment).subscribe(
        (response) => {
          this.openSuccessSnackBar("Appointment created successfully");
          this.appointmentForm.reset();
          if (response && response.message) {
            console.log('Appointment created successfully:', response);
          } else {
            console.error('Unexpected response format:', response);
          }
        },
        (error) => {
          console.error('Error creating appointment:', error);
          if (error.status === 400) {
            console.error('Bad Request. Check the request payload.');
          } else {
            const errorMessage = error && error.message ? error.message : 'Unknown error occurred';
            this.openErrorSnackBar(errorMessage);
          }
        }
      );
    }
    //urg
    if (this.conflict(appointment) && this.appointmentForm.get('categoryAppoint').value === 'urgent') {
      this.appointmentservice.createUrgentAppointment(appointment).subscribe(
        (response) => {
          this.openSuccessSnackBar("Appointment created successfully");
          this.appointmentForm.reset();
          if (response && response.message) {
            console.log('Appointment created successfully:', response);
          } else {
            console.error('Unexpected response format:', response);
          }
        },
        (error) => {
          console.error('Error creating appointment:', error);
          if (error.status === 400) {
            console.error('Bad Request. Check the request payload.');
          } else {
            const errorMessage = error && error.message ? error.message : 'Unknown error occurred';
            this.openErrorSnackBar(errorMessage);
          }
        }
      );
    }
    else{
      this.appointmentservice.createAppointment(appointment).subscribe(
        (response) => {
          this.openSuccessSnackBar("Appointment created successfully");
          this.appointmentForm.reset();
          if (response && response.message) {
            console.log('Appointment created successfully:', response);
          } else {
            console.error('Unexpected response format:', response);
          }
        },
        (error) => {
          console.error('Error creating appointment:', error);
          if (error.status === 400) {
            console.error('Bad Request. Check the request payload.');
          } else {
            const errorMessage = error && error.message ? error.message : 'Unknown error occurred';
            this.openErrorSnackBar(errorMessage);
          }
        }
      );
    }


  }

  disponibility(appointment: any): boolean {
      for (const app of this.appointments) {
        const isDateConflict =
          (appointment.startDate >= app.startDate && appointment.startDate <= app.endDate) ||
          (appointment.endDate >= app.startDate && appointment.endDate <= app.endDate);

        const isPatientConflict = app.patient.userKy === appointment.patient.userKy;
        const isStaffConflict = app.staff.userKy === appointment.staff.userKy;

        if ((isDateConflict && isPatientConflict) || (isDateConflict && isStaffConflict) || (isDateConflict && isPatientConflict && isStaffConflict)) {

          if (isPatientConflict) {
            this.openErrorSnackBar("patient is not availabale")
          }
          if (isStaffConflict) {
            this.openErrorSnackBar("doctor is not availabale")
          }
          if (isPatientConflict && isStaffConflict) {
            this.openErrorSnackBar("patient and doctor are not availabale")
          }

          return false;
        }
      }
      // Aucun conflit trouvé, donc l'heure est disponible
      return true;
  }

  conflict(appointment: any): boolean {
    for (const app of this.appointments) {
      const isDateConflict =
        (appointment.startDate >= app.startDate && appointment.startDate <= app.endDate) ||
        (appointment.endDate >= app.startDate && appointment.endDate <= app.endDate);

      const isPatientConflict = app.patient.userKy === appointment.patient.userKy;
      const isStaffConflict = app.staff.userKy === appointment.staff.userKy;

      if ((isDateConflict && isPatientConflict) || (isDateConflict && isStaffConflict) || (isDateConflict && isPatientConflict && isStaffConflict)) {

        return false;
      }
    }
    // Aucun conflit trouvé, donc l'heure est disponible
    return true;
}




  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-error"]
    });
  }
  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-success"]
    });
  }
}

