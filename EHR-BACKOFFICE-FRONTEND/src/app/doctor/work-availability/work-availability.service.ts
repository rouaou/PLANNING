import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkAvailability} from './work-availability.model'; // Import the model if you have one

@Injectable({
  providedIn: 'root'
})
export class WorkAvailabilityService {
  getDoctorAvailability() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8090/api/availability'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  getAllWorkAvailability(): Observable<WorkAvailability[]> {
    return this.http.get<WorkAvailability[]>(`${this.baseUrl}`);
  }

  getWorkAvailabilityById(id: number): Observable<WorkAvailability> {
    return this.http.get<WorkAvailability>(`${this.baseUrl}/${id}`);
  }

  createWorkAvailability(workAvailability: WorkAvailability): Observable<WorkAvailability> {
    return this.http.post<WorkAvailability>(`${this.baseUrl}/createAvail`, workAvailability);
  }

  updateWorkAvailability(id: number, workAvailability: WorkAvailability): Observable<WorkAvailability> {
    return this.http.put<WorkAvailability>(`${this.baseUrl}/${id}`, workAvailability);
  }

  deleteWorkAvailability(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  addAvailabilityToStaff(staffId: number, availability: Partial<WorkAvailability>): Observable<WorkAvailability> {
    return this.http.post<WorkAvailability>(`${this.baseUrl}/${staffId}/availability`, availability);

  }
  getAvailabilityForStaff(userKy: number) {
    return this.http.get<WorkAvailability[]>(`${this.baseUrl}/workplan/${userKy}`);
  }

}
