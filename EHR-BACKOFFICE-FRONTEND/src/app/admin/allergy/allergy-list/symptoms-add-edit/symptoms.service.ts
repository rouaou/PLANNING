import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SymptomsList } from './symptoms.model';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  private baseUrl  = 'http://localhost:8090/symptoms';

  // we imported httpclient and injected using the constructor
   constructor(private http: HttpClient) {}

  getAllSymptoms(): Observable<SymptomsList[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<SymptomsList[]>(url);
  }
}
