import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiseaseCodeList } from './disease-code-list.model';

@Injectable({
  providedIn: 'root'
})
export class DiseaseCodeService {

  private baseUrl = 'http://localhost:8090/disease'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  getAllCodes(): Observable<DiseaseCodeList[]> {

   return this.http.get<DiseaseCodeList[]>(this.baseUrl);
 }
 createCode(codeData: DiseaseCodeList): Observable<DiseaseCodeList> {
  return this.http.post<DiseaseCodeList>( this.baseUrl, codeData);
  }
  updateCode( disease_Key: number, codeData: DiseaseCodeList): Observable<DiseaseCodeList> {
    return this.http.put<DiseaseCodeList>(`${this.baseUrl}/${disease_Key}`, codeData);
  }

  deleteCode(disease_Key: number): Observable<any[]> {
    return this.http.delete<any>(`${this.baseUrl}/${disease_Key}`);

  }
}
