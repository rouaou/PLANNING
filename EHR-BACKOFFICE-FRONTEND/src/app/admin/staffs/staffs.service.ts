import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from './staffs.model';

@Injectable({
  providedIn: 'root'
})
export class StaffsService {
private baseUrl ='http://localhost:8090/api/staff';
  constructor(private http: HttpClient) { }


//list staffs
  getAllStaffs(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.baseUrl}/listStaffs`);
  }

  createStaff(staff:Partial<Staff>): Observable<Staff> {
    return this.http.post<Staff>(`${this.baseUrl}/createStaff`, staff);
  }

  updateStaff(userKy: number, staff: Staff){
    return this.http.put(`${this.baseUrl}/update/${userKy}`, staff);
  }

  deleteStaff(userKy: number): Observable<Staff> {
    return this.http.delete<Staff>(`${this.baseUrl}/delete/${userKy}`);
  }
  getAssignedStaffByGroupId(stgrpKey: number) {
    return this.http.get<any[]>(`${this.baseUrl}/${stgrpKey}/assigned-staff`);
  }
  checkEmailDuplicate(email: string): Observable<boolean> {
    // Replace 'your-api-endpoint' with the actual URL of your backend endpoint
    const apiUrl = `your-api-endpoint/check-email-duplicate`;

    // Create an object with the email to send to the server
    const requestData = { email };

    // Send a POST request to your backend to check for duplicate emails
    return this.http.post<boolean>(this.baseUrl, requestData);
  }
    // Method to check if the identifier is unique
    checkIdentifierUnique(identifier: string): Observable<boolean> {
      const url = `${this.baseUrl}/check-identifier-unique/${identifier}`;
      return this.http.get<boolean>(url);
    }
 // Method to check if the professional email is unique
 checkProfessionalEmailUnique(professionalEmail: string): Observable<boolean> {
  const url = `${this.baseUrl}/check-professional-email-unique/${professionalEmail}`;
  return this.http.get<boolean>(url);
}
  getStaffCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
  checkPhoneNumberUniqueness(phoneNumber: Number): Observable<boolean> {
    const url = `${this.baseUrl}/checkPhoneNumberUniqueness?phoneNumber=${phoneNumber}`;
    return this.http.get<boolean>(url);
  }
  getStaffByService(service: string): Observable<any[]> {
    const url = `${this.baseUrl}/byservice/${service}`;
    return this.http.get<any[]>(url);
  }
  getStaffByServiceAndStaffGroup(serviceId: number, staffGroupId: number): Observable<Staff[]> {
    const url = `${this.baseUrl}/staff/getByServiceAndStaffGroup/${serviceId}/${staffGroupId}`;
    return this.http.get<Staff[]>(url);
  }
}
