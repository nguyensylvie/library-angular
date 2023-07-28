import { Injectable } from "@angular/core";
import { Document } from "./document.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/documents`;

  documentTypeTranslations: { [key: string]: string } = {
    BOOK: "Livre",
    DICTIONARY: "Dictionnaire",
    COMIC: "Bande dessinée",
    ARCHIVE: "Archive",
    NOVEL: "Roman",
    MAGAZINE: "Magazine",
    NEWSPAPER: "Journal",
  };

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl);
  }

  getDocumentById(documentId: number): Observable<Document> {
    const url = `${this.apiUrl}/${documentId}`;
    return this.http.get<Document>(url);
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
    return this.http.post(this.apiUrl, newDocument);
  }

  updateDocument(document: Document): Observable<any> {
    const url = `${this.apiUrl}/${document.documentId}`;
    return this.http.put(url, document);
  }

  deleteDocument(documentId: number): Observable<any> {
    const url = `${this.apiUrl}/${documentId}`;
    return this.http.delete(url);
  }

  getAllDocumentTypes(): Observable<string[]> {
    const url = `${this.apiUrl}/document-type`;
    return this.http.get<string[]>(url);
  }
}
