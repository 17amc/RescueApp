import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  getAdministrativos(): Observable<any> {
    return this.http.get('https://rescueapprescue.000webhostapp.com/servidor/get_all_admins.php');
  }

  editAdministrativo(admin: any): Observable<any> {
    let body = new HttpParams()
      .set('ID', admin.ID)
      .set('TipoDocumento', admin.TipoDocumento)
      .set('NumeroDocumento', admin.NumeroDocumento)
      .set('Especializacion', admin.Especializacion)
      .set('Telefono', admin.Telefono)
      .set('CentroFormacion', admin.CentroFormacion)
      .set('Correo', admin.Correo);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    console.log('Datos enviados al servidor: ', body.toString()); 
  
    return this.http.post('https://rescueapprescue.000webhostapp.com/servidor/update_admin.php', body.toString(), { headers });
  }
  

}
