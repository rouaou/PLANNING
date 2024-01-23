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
import { Patient } from 'app/doctor/patient/patient.model';
import { Staff } from 'app/admin/staffs/staffs.model';
import { Appointment } from 'app/admin/appointmentAdmin/appointment.model';
import { AppointmentService } from 'app/admin/appointmentAdmin/appointment.service';
import {  WorkAvailability } from 'app/secretary/work-availability/work-availability.model';
import { WorkAvailabilityService } from 'app/secretary/work-availability/work-availability.service';
import { ActivatedRoute } from '@angular/router';
import { AvailabilityType } from 'app/secretary/work-availability/work-availability.enum';

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
  availabilityData: WorkAvailability[] = [];

  calendarEvents?: EventInput[];
  tempEvents?: EventInput[];
  patients: Patient[] = [];
  staffs: Staff[] = [];
  userKy: number;

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
    public availService: WorkAvailabilityService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute // Add this line

  ) {
    super();
    this.dialogTitle = 'Add New Appointment';
    const blankObject = {} as Calendar;
    this.calendar = new Calendar();
    this.addCusForm = this.createCalendarForm(this.calendar);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userKy = +params.get('userKy') || 1;
      console.log('Current URL ID:', this.userKy);

      this.getAvailabilityForStaff(this.userKy);
    });
  }

  getAvailabilityForStaff(staffId: number): void {
    this.availService.getAvailabilityForStaff(staffId).subscribe(
      (availability) => {
        this.availabilityData = availability;
        this.calendarEvents = this.mapAvailabilityToEvents(availability);
        this.calendarOptions.events = this.calendarEvents;
        console.log('Availabilities:', this.availabilityData);
      },
      (error) => {
        console.error('Error fetching availability', error);

        if (error.status === 404) {
          // Handle the case where the staff is not found (404 Not Found)
          console.error('Staff not found with id:', staffId);
        } else {
          // Handle other errors
          console.error('Unexpected error occurred:', error);
        }
      }
    );
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay',
    },
    initialView: 'timeGridWeek',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      verticalPosition: 'top', // You can adjust this based on your UI
      horizontalPosition: 'center', // You can adjust this based on your UI
      panelClass: 'error-snackbar', // Add a custom CSS class for styling
    });
  }




// Map WorkAvailability data to FullCalendar events
mapAvailabilityToEvents(availabilities: WorkAvailability[]): EventInput[] {
  return availabilities.map((availability) => ({
    id: availability.id.toString(),
    title: 'Availability', // You can customize the title as needed
    start: new Date(availability.startTime),
    end: new Date(availability.endTime),
    className: 'fc-event-availability',

    // Add a custom class for styling
    // You can add other properties based on your requirements
  }));
}




  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDateSelect(selectInfo: DateSelectArg) {
   // this.addNewAppoint();
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
        //this.getAvailabilityForStaff(userKy);
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
