import { Component, ViewChild, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { MatDialog } from '@angular/material/dialog';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Calendar } from './calendar.model';
import { CalendarService } from './calendar.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UnsubscribeOnDestroyAdapter } from '@shared';//import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { Direction } from '@angular/cdk/bidi';
import { AddAppointmentComponent } from './dialogs/add-appointment/add-appointment.component';
import { Patient } from '../patient/patient.model';
import { Staff } from 'app/admin/staffs/staffs.model';
import { Appointment } from 'app/admin/appointmentAdmin/appointment.model';
import { AppointmentService } from 'app/admin/appointmentAdmin/appointment.service';
import { AuthService } from '@core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @ViewChild('calendar', { static: false })
  calendar: Calendar | null;
  public addCusForm: UntypedFormGroup;
  dialogTitle: string;
  filterOptions = 'All';
  calendarData!: Calendar;
  filterItems: string[] = [
    'urgent',
    'normal',

  ];
  appointments: Appointment[] = [];

  calendarEvents?: EventInput[];
  tempEvents?: EventInput[];
  patients: Patient[] = [];
  staffs: Staff[] = [];

  // Variables pour stocker les valeurs sélectionnées pour "Select Patient" et "Select Staff"
  selectedPatient: number; // Remplacez le type par le type approprié (généralement le type de l'ID).
  selectedStaff: number;

  public filters: Array<{ name: string; value: string; checked: boolean }> = [
    { name: 'urgent', value: 'urgent', checked: true },
    { name: 'normal', value: 'normal', checked: true },
  ];
 // subs: any;

  constructor(
    private fb: UntypedFormBuilder,
    private dialog: MatDialog,
    public calendarService: CalendarService,
    public appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    super();
    this.dialogTitle = 'Add New Appointment';
    const blankObject = {} as Calendar;
    this.calendar = new Calendar();
    this.addCusForm = this.createCalendarForm(this.calendar);
  }

  public ngOnInit(): void {
    this.getAppointments();


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
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };


  getAppointments(){
    this.appointmentService.retrieveAppointment().subscribe((data)=>{
      //this.appointments = data;
      this.appointments = data.filter(appointment => appointment.status === 1 && appointment.staff.userKy === this.authService.currentUserValue.id);
      this.calendarEvents = this.mapAppointmentToEvents(this.appointments);
      this.calendarOptions.events = this.calendarEvents; // Update the events property
      console.log("appon",this.appointments)
    })
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
        //service: appointment.service,
      },


    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDateSelect(selectInfo: DateSelectArg) {
    this.addNewAppoint();
  }

  addNewAppoint() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      data: {
        calendar: this.calendar,
        action: 'add',
      },
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.calendarData = this.calendarService.getDialogData();
        console.log(this.calendarData.startDate);
        this.getAppointments();
        this.calendarEvents = this.calendarEvents?.concat({
          // add new event data. must create new array
          id: this.calendarData.id,
          title: this.calendarData.title,
          start: this.calendarData.startDate,
          end: this.calendarData.endDate,
          className: this.getClassNameValue(this.calendarData.category),
          groupId: this.calendarData.category,
          categoryAppoint: this.calendarData.categoryAppoint,
          details: this.calendarData.details,
          staff: this.calendarData.staff,
          patient: this.calendarData.patient,
         // service: this.calendarData.service,
        });
        this.calendarOptions.events = this.calendarEvents;
        this.addCusForm.reset();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  changeCategory(event: MatCheckboxChange, filter: { name: string }) {
    if (event.checked) {
      this.filterItems.push(filter.name);
    } else {
      this.filterItems.splice(this.filterItems.indexOf(filter.name), 1);
    }
    this.filterEvent(this.filterItems);
  }

  filterEvent(element: string[]) {
    const list = this.calendarEvents?.filter((x) =>
      element.map((y?: string) => y).includes(x.groupId)
    );

    this.calendarOptions.events = list;
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.eventClick(clickInfo);
  }

  eventClick(row: EventClickArg) {
    const calendarData = {
      id: row.event.id,
      title: row.event.title,
      groupId: row.event.groupId,
      categoryAppoint:row.event.extendedProps['categoryAppoint'],
      startDate: row.event.start,
      endDate: row.event.end,
      details: row.event.extendedProps['details'],
      staff: row.event.extendedProps['staff'], // Récupérez les informations du personnel
      patient: row.event.extendedProps['patient'], // Récupérez les informations du patient
     // service: row.event.extendedProps['service'], // Récupérez les informations du patient


    };
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      data: {
        calendar: calendarData,
        action: 'edit',
      },
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents?.forEach((element, index) => {
          if (this.calendarData.id === element.id) {
            this.editEvent(index, this.calendarData);
          }
        }, this);
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
        this.addCusForm.reset();
      } else if (result === 'delete') {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents?.forEach((element) => {
          if (this.calendarData.id === element.id) {
            row.event.remove();

          }
        }, this);

        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  editEvent(eventIndex: number, calendarData: Calendar) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const calendarEvents = this.calendarEvents!.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    singleEvent.title = calendarData.title;
    singleEvent.start = calendarData.startDate;
    singleEvent.end = calendarData.endDate;
    singleEvent.className = this.getClassNameValue(calendarData.category);
    singleEvent.groupId = calendarData.category;
    singleEvent['details'] = calendarData.details;
    singleEvent['staff']= calendarData.staff;
    singleEvent['patient']= calendarData.patient;
    singleEvent['categoryAppoint']= calendarData.categoryAppoint;
   // singleEvent['service']= calendarData.service;

    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array

    this.calendarOptions.events = calendarEvents;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
  }

  createCalendarForm(calendar: Calendar): UntypedFormGroup {
    return this.fb.group({
      id: [calendar.id],
      title: [
        calendar.title,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      groupId: [calendar.category],
      startDate: [calendar.startDate, [Validators.required]],
      endDate: [calendar.endDate, [Validators.required]],
      details: [
        calendar.details,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      staff: [calendar.staff],
      patient: [calendar.patient],
      categoryAppoint: [calendar.categoryAppoint],
      //service: [calendar.service]

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

  getClassNameValue(category: string) {
    let className;

    if (category === 'normal') className = 'fc-event-success';
    else if (category === 'urgent') className = 'fc-event-danger';

    return className;
  }
  addCustomEvent() {
    const newEvent: EventInput = {
      title: 'Nouvel Événement',
      start: new Date(),
      patient: this.selectedPatient,
      staff: this.selectedStaff,

    }
     this.calendarEvents = this.calendarEvents.concat(newEvent);

     this.calendarOptions.events = this.calendarEvents;
    }
}
