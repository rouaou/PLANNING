import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffGroup } from './staff-group.model';
import { Staff } from '../staffs/staffs.model';


@Injectable({
  providedIn: 'root'
})
export class StaffGroupService {

  private baseUrl ='http://localhost:8090/api/staffGrp';
  constructor(private http: HttpClient) { }

  getAllStaffGrp(): Observable<StaffGroup[]> {
    return this.http.get<StaffGroup[]>(`${this.baseUrl}/listStaffsGrp`);
  }
  createStaffGrp(staffGrp:Partial<StaffGroup>): Observable<StaffGroup> {
    return this.http.post<StaffGroup>(`${this.baseUrl}/createStaffGrp`, staffGrp);
  }
  updateStaffGrp(updatedStaffGrp:StaffGroup , stgrpKey:number){
    return this.http.put(`${this.baseUrl}/updateStaffGrp/${stgrpKey}`, updatedStaffGrp);
  }
  deleteStaffGrp(stgrpKey:number){
    return this.http.delete<StaffGroup>(`${this.baseUrl}/deleteStaffGrp/${stgrpKey}`);
  }

  getStaffGrpById(stgrpKey: number): Observable<StaffGroup> {
    const url = `${this.baseUrl}/${stgrpKey}`;
    return this.http.get<StaffGroup>(url);
  }
  getChildElements(stgrpKey: number): Observable<Staff[]> {
    const url = `${this.baseUrl}/${stgrpKey}/child-elements`;
    return this.http.get<Staff[]>(url);
  }


  addChildElement(stgrpKey: number, staff: Partial<Staff>): Observable<string> {
    const url = `${this.baseUrl}/${stgrpKey}/addStaff`;
    const requestBody = staff;
    return this.http.post<string>(url, requestBody);
  }

  getStaffGrpCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

}

