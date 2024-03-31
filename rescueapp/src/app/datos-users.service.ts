import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosUsersService {

  constructor(private http: HttpClient) { }

  updateUser(user: any) {
    let body = new HttpParams()
      .set('Nombres', user.Nombres)
      .set('Apellidos', user.Apellidos)
      .set('Correo', user.Correo)
      .set('Telefono', user.Telefono)
      .set('CentroFormacion', user.CentroFormacion)
      .set('Ficha', user.Ficha)
      .set('Contrasena', user.Contrasena)
      .set('NumeroDocumento', user.NumeroDocumento);
      
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post("https://rescueapprescue.000webhostapp.com/servidor/update_date_user.php", body.toString(), { headers });
  }
}
