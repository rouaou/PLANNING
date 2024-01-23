import { Injectable } from '@angular/core';
import { AllergyList } from './allergy-list.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
providedIn: 'root',
})
export class AllergyListService {
  addNewAllergy(arg0: { name: string; }) {
    throw new Error('Method not implemented.');
  }
  dataChange: BehaviorSubject<AllergyList[]> = new BehaviorSubject<
  AllergyList[]
>([]);


  private baseUrl = 'http://localhost:8090/allergy'; // Replace with your API base URL

  constructor(private http: HttpClient) {}
//to show all allergies in the list
  getAllAllergies(): Observable<AllergyList[]> {
     // Replace 'allergies' with your API endpoint
    return this.http.get<AllergyList[]>(this.baseUrl);
  }

  deleteAllergy(allergy_Key: number): Observable<any[]> {
    return this.http.delete<any>(`${this.baseUrl}/${allergy_Key}`);

  }

  createAllergy(allergyData: AllergyList): Observable<AllergyList> {
  return this.http.post<AllergyList>( this.baseUrl, allergyData);
  }
  updateAllergy( allergy_Key: number, allergyData: AllergyList): Observable<AllergyList> {
    return this.http.put<AllergyList>(`${this.baseUrl}/${allergy_Key}`, allergyData);
  }
}
