import { Injectable } from '@angular/core';
import { Observable, throwError, ErrorObserver } from 'rxjs'; // Import throwError correctly
import { BehaviorSubject } from 'rxjs';
import { ActiveIngredient } from './activeIngredient.model';
import { HttpClient,HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { catchError } from 'rxjs/operators'; // Import catchError correctly
import { PhysicalTreatment } from 'app/admin/physicalTreatments/physical-treatments-list/physicalTreatment.model';
@Injectable({
  providedIn: 'root'
})
export class ActiveIngredientService  {
  private baseUrl  = 'http://localhost:8090/api/project/activeIngredient';

 // we imported httpclient and injected using the constructor
  constructor(private http: HttpClient) {}

  getAllActiveIngredients(): Observable<ActiveIngredient[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<ActiveIngredient[]>(url);
  }
}
