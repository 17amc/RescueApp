import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckEmailService {

  constructor(private http: HttpClient) { }

  checkEmail(email: string) {
    let body = new HttpParams().set('Correo', email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post("https://rescueapprescue.000webhostapp.com/servidor/check_user_correo_change.php", body.toString(), { headers });
  }

  changePassword(email: string) {
    let body = new HttpParams().set('email', email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post("https://rescueapprescue.000webhostapp.com/servidor/change_pass.php", body.toString(), { headers });
  }

  VerifyEmail(email: string) {
    let body = new HttpParams().set('email', email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post("https://rescueapprescue.000webhostapp.com/servidor/verify_register_email.php", body.toString(), { headers });
  }

  RegisterSucces(email: string) {
    let body = new HttpParams().set('email', email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post("https://rescueapprescue.000webhostapp.com/servidor/success_registro.php", body.toString(), { headers });
  }

  ChangeSucces(email: string) {
    let body = new HttpParams().set('email', email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post("https://rescueapprescue.000webhostapp.com/servidor/succes_change.php", body.toString(), { headers });
  }

  sedReportesGmail(categoriaID: string, usuarioID: string, nombre: string, ficha: string, lugar: string, descripcion: string) {
    let body = new HttpParams()
        .set('CategoriaID', categoriaID)
        .set('UsuarioID', usuarioID)
        .set('Nombre', nombre)
        .set('Ficha', ficha)
        .set('Lugar', lugar)
        .set('Descripcion', descripcion);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post("https://rescueapprescue.000webhostapp.com/servidor/send_email_report_admin.php", body.toString(), { headers });
}

VerifyEmailNuevoUs(email: string) {
  let body = new HttpParams().set('email', email);
  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  return this.http.post("https://rescueapprescue.000webhostapp.com/servidor/verify_new_email_us.php", body.toString(), { headers });
}



}
