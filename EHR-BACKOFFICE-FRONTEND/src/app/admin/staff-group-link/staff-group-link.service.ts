import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StaffGroupLink } from './staff-group-link.model';

@Injectable({
  providedIn: 'root'
})
export class StaffGrpLinkService {

  private baseUrl = 'http://localhost:8090/api/staffGrpLink';

  constructor(private http: HttpClient) { }

  getAllStaffGrpLinks(): Observable<StaffGroupLink[]> {
    return this.http.get<StaffGroupLink[]>(`${this.baseUrl}/listStaffsGrpLink`);
  }


  assignStaffToGroup(staffKy: number, staffGrpKy: number): Observable<StaffGroupLink> {
    const params = new HttpParams()
      .set('staffKy', staffKy.toString())
      .set('staffGrpKy', staffGrpKy.toString());

    return this.http.post<StaffGroupLink>(`${this.baseUrl}/assign`, {}, { params });
  }
  unassignStaffFromGroup(staffKy: number, staffGrpKy: number): Observable<StaffGroupLink> {
    const params = new HttpParams()
      .set('staffKy', staffKy)
      .set('staffGrpKy', staffGrpKy);

    return this.http.post<StaffGroupLink>(`${this.baseUrl}/unassign`, {}, { params })

}
// findStaffGrpLinkKy(staffGrpKy: number, staffKy: number): Observable<number> {
//   return this.http.get<number>(
//     `${this.baseUrl}/findStaffGrpLinkKyByStaffGrpKyAndStaffKy?staffGrpKy=${staffGrpKy}&staffKy=${staffKy}`
//   );
// }

deleteStaffGrpLink(id: number): Observable<any> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.delete(url);
}
private handleError(error: HttpErrorResponse) {
  // Handle HTTP errors
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code
    console.error(`Backend returned code ${error.status}, body was:`, error.error);
  }

  // Return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
}

}
