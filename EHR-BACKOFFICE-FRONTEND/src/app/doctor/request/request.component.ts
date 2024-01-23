import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core';
import { Appointment } from 'app/admin/appointmentAdmin/appointment.model';
import { AppointmentService } from 'app/admin/appointmentAdmin/appointment.service';
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  appointments: Appointment[];

  constructor(
    private fb: UntypedFormBuilder,
    private dialog: MatDialog,
    public appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {

    emailjs.init('K_5B0OS3cD_x2KV0A');

  }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(){
    this.appointmentService.retrieveAppointment().subscribe((data)=>{
      this.appointments = data.filter(appointment => appointment.status === 0 && appointment.staff.userKy === this.authService.currentUserValue.id);
    })
  }

  acceptAppointment(app: Appointment){
    const appointment : Partial<Appointment> = {
      status : 1
    }
    this.appointmentService.updateAppointment(app.id, appointment).subscribe(data => {
      this.getAppointments();
      this.sendEmailToDestination("roroouanes@gmail.com")
    })
  }

  refuseAppointment(app: Appointment){
    this.appointmentService.deleteAppointment(app.id).subscribe(data => {
      this.getAppointments();
    })
  }

  sendEmailToDestination(email: string): void {

      let from: string = 'healthcare@hospital.org';
      let message: string = '';


      const params = {
        destinationName: email,
        subject: 'Appointment Reminder ',
        message: message,
        from_name: from,
      };


      emailjs.send('service_gpi7p5h', 'template_dukof99',params)
        .then(response => {
          console.log('Email sent successfully:', response);
        })
        .catch(error => {
          console.error('Error sending email:', error);
        });
    }

}
