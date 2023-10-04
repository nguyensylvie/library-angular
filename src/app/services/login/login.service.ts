import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log(username, password);
    // const headers = new HttpHeaders({
    //   Authorization: "Basic " + btoa(username + ":" + password),
    // });
    // console.log(headers);
    // return this.http.post(`${this.apiUrl}/login`, {}, { headers: headers });
    return this.http.post(`${this.apiUrl}/login`, {});
  }
}
