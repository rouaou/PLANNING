import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VaccList } from './vacc-list.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VaccListService {
  dataChange: BehaviorSubject<VaccList[]> = new BehaviorSubject<
  VaccList[]
>([]);

  private baseUrl = 'http://localhost:8090/vaccination';


  constructor(private http: HttpClient) { }

  getAllVaccinations(): Observable<VaccList[]> {
    // Replace 'allergies' with your API endpoint
   return this.http.get<VaccList[]>(this.baseUrl);
 }

 deleteVaccination(vaccination_Key: number): Observable<any[]> {
  return this.http.delete<any>(`${this.baseUrl}/${vaccination_Key}`);

}

createVaccination(vaccinationData: VaccList): Observable<VaccList> {
  return this.http.post<VaccList>( this.baseUrl, vaccinationData);
  }


  updateVaccination( vaccination_Key: number, vaccinationData: VaccList): Observable<VaccList> {
    return this.http.put<VaccList>(`${this.baseUrl}/${vaccination_Key}`, vaccinationData);
  }
}
