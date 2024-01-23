import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment.model';
import { Patient } from 'app/doctor/patient/patient.model';
@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  private baseUrl = 'http://localhost:8090/api/appointment';

  constructor(private http: HttpClient) { }

  /*retrieveAppointment(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/listAppoint`);
  }*/

  retrieveAppointment(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/listAppoint`);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/getbyid/${id}`);
  }

  createAppointment(appointment: Partial<Appointment>): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/createAppoint`, appointment);
  }
  updateAppointment(id: number, updatedAppointment: Partial<Appointment>): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.baseUrl}/${id}`, updatedAppointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  createUrgentAppointment(appointment: Partial<Appointment>): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/createUrgentAppoint`, appointment);
  }

  getAppointmentCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  findPatientsByStaffId(userKy: number): Observable<Patient[]> {
    const url = `${this.baseUrl}/staff/patients/${userKy}`;
    return this.http.get<Patient[]>(url);
  }


}
