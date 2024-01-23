import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from './patient.model';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
private baseUrl ='http://localhost:8090/api/patient';
  constructor(private http: HttpClient) { }


//list patient
  getAllPatient(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/listPatients`);
  }

  createPatient(patient:Partial<Patient>): Observable<Patient> {
    return this.http.post<Patient>(`${this.baseUrl}/createPatient`, patient);
  }

  updatePatient(userKy: number, patient: Patient){
    return this.http.put(`${this.baseUrl}/update/${userKy}`, patient);
  }

  deletePatient(userKy: number): Observable<Patient> {
    return this.http.delete<Patient>(`${this.baseUrl}/delete/${userKy}`);
  }
  getPatientCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
