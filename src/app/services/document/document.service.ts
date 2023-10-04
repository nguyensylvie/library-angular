import { Injectable } from "@angular/core";
import { Document } from "./document.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/documents`;
  private authHeaders: HttpHeaders;

  documentTypeTranslations: { [key: string]: string } = {
    BOOK: "Livre",
    DICTIONARY: "Dictionnaire",
    COMIC: "Bande dessinée",
    ARCHIVE: "Archive",
    NOVEL: "Roman",
    MAGAZINE: "Magazine",
    NEWSPAPER: "Journal",
  };

  constructor(private http: HttpClient) {
    this.authHeaders = this.getAuthHeaders("admin", "admin123");
  }

  private getAuthHeaders(username: string, password: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password),
    });
  }

  getGoogleBooksApi(searchTerm: string): Observable<any> {
    const url = "https://www.googleapis.com/books/v1/volumes";
    const queryParams = {
      q: searchTerm,
    };
    return this.http.get(url, { params: queryParams });
  }

  getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl, {
      headers: this.authHeaders,
    });
  }

  getDocumentById(documentId: number): Observable<Document> {
    const url = `${this.apiUrl}/${documentId}`;
    return this.http.get<Document>(url, { headers: this.authHeaders });
  }

  isDocumentExists(documentId: number): Observable<boolean> {
    return this.getAllDocuments().pipe(
      map((documents: Document[]) => {
        // Checks if a document with the matching ID exists in the document list
        return documents.some((document) => document.documentId === documentId);
      })
    );
  }

  addDocument(newDocument: Document): Observable<any> {
    return this.http.post(this.apiUrl, newDocument, {
      headers: this.authHeaders,
    });
  }

  updateDocument(document: Document): Observable<any> {
    const url = `${this.apiUrl}/${document.documentId}`;
    return this.http.put(url, document, { headers: this.authHeaders });
  }

  deleteDocument(documentId: number): Observable<any> {
    const url = `${this.apiUrl}/${documentId}`;
    let username = "admin";
    let password = "admin123";
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password),
    });
    return this.http.delete(url, { headers: headers });
  }

  getAllDocumentTypes(): Observable<string[]> {
    const url = `${this.apiUrl}/document-type`;
    return this.http.get<string[]>(url, { headers: this.authHeaders });
  }
}
