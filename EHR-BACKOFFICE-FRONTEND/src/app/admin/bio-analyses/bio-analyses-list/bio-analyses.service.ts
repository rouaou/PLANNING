import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BioAnalysesList } from './bio-analyses.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BioAnalysesService {
  private baseUrl = 'http://localhost:8090/BioAnalyses';
  constructor(private http: HttpClient) { }

  getAllAnalyses(): Observable<BioAnalysesList[]> {
    // Replace 'allergies' with your API endpoint
   return this.http.get<BioAnalysesList[]>(this.baseUrl);
 }
 createAnalyse(analyseData: BioAnalysesList): Observable<BioAnalysesList> {
  return this.http.post<BioAnalysesList>( this.baseUrl, analyseData);
  }
  updateAnalyse( analyse_Key: number, analyseData: BioAnalysesList): Observable<BioAnalysesList> {
    return this.http.put<BioAnalysesList>(`${this.baseUrl}/${analyse_Key}`, analyseData);
  }
  deleteAnalyse(analyse_Key: number): Observable<any[]> {
    return this.http.delete<any>(`${this.baseUrl}/${analyse_Key}`);

  }
}
