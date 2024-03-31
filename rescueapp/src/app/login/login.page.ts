import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  user: any = { numerodocumento: '', contrasena: '' };

  constructor(private http: HttpClient, private router: Router,  private alertCtrl: AlertController, private storage: Storage,private loadingController: LoadingController) {}

  ngOnInit() {}

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Inicio de sesión',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  deleteInput() {
    this.user.numerodocumento = '';
    this.user.contrasena = '';
  }

  login() {
    let body = new HttpParams()
      .set('NumeroDocumento', this.user.numerodocumento)
      .set('Contrasena', this.user.contrasena);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post("https://rescueapprescue.000webhostapp.com/servidor/login.php", body.toString(), { headers })
      .subscribe(async (data: any) => {
        console.log(data);
        if (data.success) {
          this.showAlert('Has iniciado sesión correctamente');
          this.deleteInput()
          await this.storage.set('role', data.role);
          await this.storage.set('user', data.user);
          if (data.role == 'superadmin') {
            this.router.navigate(['/home-superadmin']);
          } else if (data.role == 'administrativo') {
            this.router.navigate(['/home-admin']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.showAlert('Las credenciales son incorrectas');
        }
      }, error => {
        console.error('Ocurrió un error al iniciar sesión:', error);
        this.showAlert('Ocurrió un error al iniciar sesión');
      });
  }
}
