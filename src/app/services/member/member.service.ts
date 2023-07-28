import { Injectable } from "@angular/core";
import { Member } from "./member.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MemberService {
  private apiUrl = `${environment.apiUrl}/members`;

  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getMemberById(memberId: number): Observable<Member> {
    const url = `${this.apiUrl}/${memberId}`;
    return this.http.get<Member>(url);
  }

  isMemberExists(memberId: number): Observable<boolean> {
    return this.getAllMembers().pipe(
      map((members: Member[]) => {
        // Checks if a member with the matching ID exists in the member list
        return members.some((member) => member.memberId === memberId);
      })
    );
  }

  addMember(newMember: Member): Observable<any> {
    return this.http.post(this.apiUrl, newMember);
  }

  updateMember(member: Member): Observable<any> {
    const url = `${this.apiUrl}/${member.memberId}`;
    return this.http.put(url, member);
  }

  deleteMember(memberId: number): Observable<any> {
    const url = `${this.apiUrl}/${memberId}`;
    return this.http.delete(url);
  }
}
