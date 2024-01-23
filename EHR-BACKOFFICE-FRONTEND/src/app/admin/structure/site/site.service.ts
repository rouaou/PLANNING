import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from './site.model';


@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private baseUrl = 'http://localhost:8090/parameterization/site';

  constructor(private http: HttpClient) { }

  getAllSites(): Observable<Site[]> {
    return this.http.get<Site[]>(this.baseUrl);
  }
  createSite(site: Site): Observable<Site> {
    return this.http.post<Site>(`${this.baseUrl}`, site);
  }
  updateSite(siteKy: number, site: Site): Observable<Site> {
    return this.http.put<Site>(`${this.baseUrl}/${siteKy}`, site);
  }
  deleteSite(siteKy: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/${siteKy}`, { observe: 'response' });
  }
  getSiteBySiteNm(siteNm: string): Observable<Site> {
    const url = `${this.baseUrl}/SiteName/${siteNm}`;
    return this.http.get<Site>(url);
  }
  getSiteByKy(siteKy: number): Observable<Site> {
    const url = `${this.baseUrl}/${siteKy}`;
    return this.http.get<Site>(url);
  }
  getSiteNameByKey(siteKey: number): Observable<string> {
    const url = `${this.baseUrl}/${siteKey}/name`;
    return this.http.get(url, { responseType: 'text' });
  }

}
