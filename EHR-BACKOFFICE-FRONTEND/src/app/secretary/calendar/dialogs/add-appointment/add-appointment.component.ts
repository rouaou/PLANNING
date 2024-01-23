import { UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { AppointmentService } from 'app/admin/appointmentAdmin/appointment.service';
import { Patient } from 'app/admin/patient/patient.model';
import { PatientService } from 'app/admin/patient/patient.service';
import { Staff } from 'app/admin/staffs/staffs.model';
import { StaffsService } from 'app/admin/staffs/staffs.service';
import { ServiceService } from 'app/admin/structure/service/service.service';
import { Service } from 'app/admin/structure/service/service.model';
import { Appointment } from 'app/admin/appointmentAdmin/appointment.model';
import { Calendar } from '../../calendar.model';
import { CalendarService } from '../../calendar.service';
import { EquipmentService } from 'app/admin/structure/material-resource/equipment/equipment.service';
import { RoomService } from 'app/admin/structure/material-resource/room/room.service';
import { Equipment } from 'app/admin/structure/material-resource/equipment/equipment.model';
import { DatePipe } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  calendar: Calendar;
}

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent {
  private datePipe: DatePipe
  selectedAppointment: Appointment; // Replace 'any' with the actual type of your appointment data

  services: Service[]=[];
  Patients: Patient[]=[];
  PatientNames: string[] = [];
  staffs: Staff[]=[];
  StaffNames: string[] = [];
  action: string;
  dialogTitle: string;
  calendarForm: UntypedFormGroup;
  appointmentForm: FormGroup;
  calendar: Calendar;
  showDeleteBtn = false;
  receivedStaff: Staff[] = [];
  staffControl = new UntypedFormControl(); // define a new control for staff
  calendarEvents?: EventInput[];
  appointments: Appointment[] = [];
  Equipments:Equipment[]=[];
  EquipmentNames: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public calendarService: CalendarService,
    private appointmentService: AppointmentService ,
    public patientService: PatientService,
    public serviceService: ServiceService,
     public staffService: StaffsService,
     public equipementService: EquipmentService,
     public roomService: RoomService,
    private fb: UntypedFormBuilder
  ) {
    console.log('DialogData:', data);

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.calendar.title;
      this.calendar = data.calendar;
      this.showDeleteBtn = true;

    } else {
      this.dialogTitle = 'add';
      const blankObject = {} as Calendar;
      this.calendar = new Calendar();
      this.showDeleteBtn = false;
    }

    this.appointmentForm = this.createContactForm();

  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
       ngOnInit(){
      this.loadpatient();
       this.loadstaffs() ;
       this.loadequip();
      //this.loadservices();
      // this.subscribeToServiceChanges();
       if (this.action === 'edit') {
        // Assuming this.calendar.service contains the existing service data
        //this.appointmentForm.get('service').setValue(this.calendar.service.serviceNm || null);
        this.loadAppointmentDetails(this.data.id);

      }        this.appointmentForm = this.createContactForm();

        }
        loadAppointmentDetails(appointmentId: number) {
          // Ensure that appointmentId is defined before making the request
          if (!appointmentId) {
            console.error('Invalid appointmentId:', appointmentId);
            // Handle the case where the appointmentId is not valid, for example, navigate to an error page
            return;
          }

          // Use the appointmentService to retrieve the appointment details by ID
          this.appointmentService.getAppointmentById(appointmentId).subscribe(
            (appointment: Appointment) => {
              if (appointment) {
                // Update the form values with the loaded appointment details
                this.appointmentForm.patchValue({
                  // ... (rest of your code)
                });

                // Additional logic to load other related data (if needed)
              } else {
                console.error('Appointment not found.');
                // Handle the case where the appointment is not found, for example, navigate to a not found page
              }
            },
            (error) => {
              console.error('Error getting appointment details:', error);
              // Handle the error, for example, show a user-friendly message
            }
          );
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
  // loadroom() {
  //   this.roomService.getAllRooms().subscribe((response) => {
  //    this.Equipments = response;

  //    this.EquipmentNames = this.Equipments.map(equipment => equipment.equipmentLabel);

  //    this.Equipments = this.Equipments.map(equipment => equipment);

  //    console.log('equipment names:', this.EquipmentNames);

  //   },
  //     (error) => {
  //      console.error('Error getting patients:', error);
  //     }
  //   );
  // }
  loadservices() {
    this.serviceService.getAllServices().subscribe((response) => {
     this.services = response;

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
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.calendar.id],
      title: [this.calendar.title, [Validators.required]],
      categoryAppoint: [this.calendar.categoryAppoint],
      startDate: [this.calendar.startDate, [Validators.required]],
      endDate: [this.calendar.endDate, [Validators.required]],
      details: [this.calendar.details],
      patient: [this.calendar.patient.firstName + ' '+ this.calendar.patient.lastName],
      staff: [this.calendar.staff.firstName + ' '+ this.calendar.staff.lastName],
      equipment: [this.calendar.equipment.equipmentLabel],
      ///service: [this.calendar.service ? this.calendar.service.serviceNm.toString() : ''],
    } );
  }
  submit() {
    // emppty stuff
  }
  deleteEvent() {
    this.appointmentService.deleteAppointment(parseInt(this.calendar.id, 10)).subscribe(
      () => {
        // Success handling, e.g., remove the selected appointment
        this.removeSelectedAppointment();

        // Show a success notification or message
        console.log('Appointment deleted successfully.');
        this.dialogRef.close('delete');
      },
      (error) => {
        // Error handling, e.g., show an error message
        console.error('Error deleting appointment:', error);
      }
    );
  }

  removeSelectedAppointment() {
    // Implement the logic to remove the selected appointment from your data structure
    // For example, if you have an array of appointments, you can filter out the selected one
    this.appointments = this.appointments.filter(appointment => appointment.id !== this.selectedAppointment.id);

    // Clear the selected appointment
    this.selectedAppointment = null;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this),
  };
  getAppointments(){
    this.appointmentService.retrieveAppointment().subscribe((data)=>{
      this.appointments = data;
      this.calendarEvents = this.mapAppointmentToEvents(data);
      this.calendarOptions.events = this.calendarEvents; // Update the events property
      console.log("appon",this.appointments)
    })
  }
  getClassNameValue(category: string) {
    let className;

    if (category === 'normal') className = 'fc-event-success';
    else if (category === 'urgent') className = 'fc-event-danger';

    return className;
  }
  mapAppointmentToEvents(appointments: Appointment[]): EventInput[] {
    return appointments.map((appointment) => ({
      id: appointment.id.toString(),
      title: appointment.title.toString(),
      start: appointment.startDate,
      end: appointment.endDate,

      groupId: appointment.categoryAppoint ? appointment.categoryAppoint.toString() : '', // Vérifiez si categoryAppoint est null
      details: appointment.details,
      className: this.getClassNameValue(appointment.categoryAppoint? appointment.categoryAppoint.toString() : '',),
     // category: appointment.categoryAppoint,
      extendedProps: {
        staff: appointment.staff, // Assurez-vous que staff est une propriété de votre modèle Appointment
        patient: appointment.patient, // Assurez-vous que patient est une propriété de votre modèle Appointment
        categoryAppoint: appointment.categoryAppoint,
        equipment: appointment.equipment,
       // service: appointment.service,
      },


    }));
  }
  public confirmAdd(): void {
    if (this.appointmentForm.valid) {
      console.log(this.appointmentForm.get('staff').value)
      const appointmentData = this.appointmentForm?.value;
      if(this.action === 'add')
      {this.appointmentService.createAppointment(appointmentData).subscribe(
        (data) => {
          console.log('Appointment created:', data);
          this.dialogRef.close('created');
          this.getAppointments();
        },
        (error) => {
          console.error('Error creating appointment:', error);
        }
      );}
      if(this.action === 'edit'){
        console.log(appointmentData)
        const updatedAppointment : Partial<Appointment> = {
          //staff: this.appointmentForm.get('staff').value,
          //patient: this.appointmentForm.get('patient').value,
          startDate:  this.appointmentForm.get('startDate').value,
          endDate:  this.appointmentForm.get('endDate').value,
          details:  this.appointmentForm.get('details').value,
          categoryAppoint: this.appointmentForm.get('categoryAppoint').value,
          title:  this.appointmentForm.get('title').value,
          equipment: this.appointmentForm.get('equipment').value,
         // service: undefined
        }

        this.appointmentService.updateAppointment(parseInt(this.appointmentForm.get('id').value, 10), updatedAppointment).subscribe(
          (data) => {
            console.log('Appointment updated:', data);
            this.dialogRef.close('submit');


          },
          (error) => {
            console.error('Error updating appointment:', error);
          }
        );

      }
    }
  }



  subscribeToServiceChanges(): void {
    this.appointmentForm.get('service').valueChanges.subscribe(selectedService => {
      // Check if a service is selected
      if (selectedService) {
        console.log("selected service", selectedService);
        const serviceKy = selectedService.serviceKy;

        this.serviceService.getStaffByServiceId(serviceKy).subscribe(data => {
          console.log('Staff members for the selected service:', data);

          // Clear the existing staffs array
          this.staffs = [];

          // Assign the received staff data directly to the staff control
          this.staffControl.setValue(data);

        });
      }
    });
  }

}






