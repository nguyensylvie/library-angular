import { Injectable } from "@angular/core";
import { Borrow } from "./borrow.model";
import { Document } from "../document/document.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BorrowService {
  private apiUrl = `${environment.apiUrl}/borrows`;

  constructor(private http: HttpClient) {}

  getAllBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(this.apiUrl);
  }

  getBorrowById(borrowId: number): Observable<Borrow> {
    const url = `${this.apiUrl}/${borrowId}`;
    return this.http.get<Borrow>(url);
  }

  isBorrowExists(borrowId: number): Observable<boolean> {
    return this.getAllBorrows().pipe(
      map((borrows: Borrow[]) => {
        // Checks if a borrow with the matching ID exists in the borrow list
        return borrows.some((borrow) => borrow.borrowId === borrowId);
      })
    );
  }

  borrowDocument(documentId: number, memberId: number): Observable<any> {
    const url = `${this.apiUrl}/${documentId}/${memberId}`;
    return this.http.post(url, {});
  }

  returnDocument(documentId: number): Observable<any> {
    const url = `${this.apiUrl}/return/${documentId}`;
    return this.http.post(url, {});
  }

  getBorrowedDocuments(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.apiUrl}/borrowed`);
  }

  getReturnedBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.apiUrl}/returned`);
  }

  getBorrowerByDocumentId(documentId: number): Observable<any> {
    const url = `${this.apiUrl}/document/${documentId}/borrower`;
    return this.http.get(url);
  }

  getBorrowIdByDocumentId(documentId: number): Observable<any> {
    const url = `${this.apiUrl}/document/${documentId}`;
    return this.http.get(url);
  }

  getBorrowedDocumentsByMemberId(memberId: number): Observable<Document[]> {
    const url = `${this.apiUrl}/member/${memberId}/borrowed`;
    return this.http.get<Document[]>(url);
  }
}
