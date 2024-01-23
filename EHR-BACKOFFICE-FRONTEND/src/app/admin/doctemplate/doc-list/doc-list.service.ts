import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocList } from './doc-list.model';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocListService {
  dataChange: BehaviorSubject<DocList[]> = new BehaviorSubject<
  DocList[]
>([]);


  private baseUrl = 'http://localhost:8090/docTemp'; // Replace with your API base URL

  constructor(private http: HttpClient) {}
//to show all allergies in the list
  getAllDocuments(): Observable<DocList[]> {
     // Replace 'allergies' with your API endpoint
    return this.http.get<DocList[]>(this.baseUrl);
  }

  /*createDocument(documentData: DocList): Observable<DocList> {
    return this.http.post<DocList>( this.baseUrl, documentData);
    }
    updateDocument( document_Key: number, documentData: DocList): Observable<DocList> {
      return this.http.put<DocList>(`${this.baseUrl}/${document_Key}`, documentData);
    }*/


    addDocument(file: File): Observable<DocList> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post<DocList>(`${this.baseUrl}/add-document`, formData);
    }

    deleteDocument(document_Key: number): Observable<any[]> {
      return this.http.delete<any>(`${this.baseUrl}/${document_Key}`);

    }



    uploadFile(file: File): Observable<string> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post<string>(`${this.baseUrl}/upload`, formData);
    }
    // Méthode pour ajouter un fichier depuis le bureau
    addFileFromDesktop(file: File): Observable<string> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post<string>(`${this.baseUrl}/add-from-desktop`, formData);
    }
    // Méthode pour récupérer les rapports médicaux depuis le backend
    getDocuments(): Observable<DocList[]> {
      return this.http.get<DocList[]>(`${this.baseUrl}/doc-temp`);
    }

    // Méthode pour télécharger un fichier de rapport médical par son ID
    downloadFile(document_Key: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/download/${document_Key}`, {
        responseType: 'arraybuffer',
      });
    }
    /*addFileToDatabase(file: File): Observable<void> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post<void>(`${this.baseUrl}/add-to-database`, formData);
    }*/
    downloadDocuments(document_Key: number): Observable<HttpResponse<Blob>> {
      const url = `${this.baseUrl}/download/${document_Key}`;
      return this.http.get(url, {
        responseType: 'blob',
        observe: 'response', // Observez la réponse complète pour obtenir les en-têtes
      });
    }
  }


