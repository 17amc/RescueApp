import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { VerifyCodeService } from '../verify-code.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CheckEmailService } from '../check-email.service';
import { LoadingServidorModalComponent } from '../loading-servidor-modal/loading-servidor-modal.component';
import { CloseModalesService } from '../close-modales.service';
import { ImageProfileModalComponent } from '../image-profile-modal/image-profile-modal.component';
import { Storage } from '@ionic/storage-angular';


interface ServerResponse {
  message: string;
  success: boolean;
  status: string; 
  path: string; 

}
@Component({
  selector: 'app-code-modal-verify-email',
  templateUrl: './code-modal-verify-email.component.html',
  styleUrls: ['./code-modal-verify-email.component.scss'],
})
export class CodeModalVerifyEmailComponent  implements OnInit {

  constructor(private modalController: ModalController, private verifyCodeService: VerifyCodeService, private toastController: ToastController, private http: HttpClient, private checkEmailService: CheckEmailService, private closeModalesService: CloseModalesService) { }

  @Input() datos: any;
  code: string = '';
  loadingModal: any;

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  sendEmail(): Promise<any> {
    return this.checkEmailService.RegisterSucces(this.datos.Correo).toPromise();
  }

  deleteInput() {
    this.datos.Nombres = '';
    this.datos.Apellidos = '';
    this.datos.TipoDocumento = '';
    this.datos.NumeroDocumento = '';
    this.datos.Telefono = '';
    this.datos.Ficha = '';
    this.datos.TipoUsuario = '';
    this.datos.CentroFormacion = '';
    this.datos.Correo = '';
    this.datos.Contrasena = '';
    this.datos.NumeroDocumento = '';
    this.datos.confirmPassword = '';
  }

  async registerUser() {
    let body = new HttpParams()
      .set('Nombres', this.datos.Nombres)
      .set('Apellidos', this.datos.Apellidos)
      .set('TipoDocumento', this.datos.TipoDocumento)
      .set('NumeroDocumento', this.datos.NumeroDocumento)
      .set('Telefono', this.datos.Telefono)
      .set('Ficha', this.datos.Ficha)
      .set('TipoUsuario', this.datos.TipoUsuario)
      .set('CentroFormacion', this.datos.CentroFormacion)
      .set('Correo', this.datos.Correo)
      .set('Contrasena', this.datos.Contrasena)
      .set('ImagenPerfil', 'uploads/PROFILE_' + this.datos.NumeroDocumento + '.jpg');
    const headers = new HttpHeaders ({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const snap = await this.http.post<ServerResponse>("https://rescueapprescue.000webhostapp.com/servidor/registro.php", body.toString(), { headers }).toPromise();
    if (snap && snap.message === 'usuario registrado con exito') {
      this.presentToast('Usuario registrado con éxito');
      await this.sendEmail(); 
      this.deleteInput();
     this.modalController.dismiss();
    } else {
      this.presentToast('Error al guardar el usuario');
    }
  }

  
  async dismissModal() {
    this.loadingModal = await this.modalController.create({
      component: LoadingServidorModalComponent
    });
  
    this.loadingModal.present();
    this.closeModalesService.addModal(this.loadingModal);
  
    this.verifyCodeService.verifyCode(this.datos.Correo, this.code).subscribe(async (data: any) => {
      if (data.success) {
        this.presentToast('El código es correcto.');
        await this.registerUser();
        
        const modal = await this.modalController.create({
          component: ImageProfileModalComponent,
          componentProps: { datos: this.datos },
          backdropDismiss: false
        });
        await modal.present();
        this.closeModalesService.addModal(modal);
      } else {
        this.presentToast('El código es incorrecto o ha vencido.');
      }
      if (this.loadingModal) {
        await this.loadingModal.dismiss();
      }
    });
  }
  ngOnInit() {}

}