import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryReportUsService {

  constructor(private http: HttpClient) { }

  getReportes(usuarioID: number): Observable<any> {
    return this.http.get(`https://rescueapprescue.000webhostapp.com/servidor/get_reportes_us.php?UsuarioID=${usuarioID}`);
  }
}
