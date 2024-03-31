import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerifyCodeService {

  constructor(private http: HttpClient) { }

  verifyCode(email: string, code: string) {
    let body = new HttpParams()
      .set('email', email)
      .set('code', code);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post("https://rescueapprescue.000webhostapp.com/servidor/check_codigo.php", body.toString(), { headers });
  }
}
