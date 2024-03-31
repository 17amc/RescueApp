import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) { }

  changePassword(email: string, password: string) {
    let body = new HttpParams()
    .set('email', email)
    .set('password', password)
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post("https://rescueapprescue.000webhostapp.com/servidor/change_password_end.php", body.toString(), {headers});
  }
}
