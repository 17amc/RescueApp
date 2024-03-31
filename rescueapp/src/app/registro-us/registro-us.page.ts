import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { CheckEmailService } from '../check-email.service';
import { CodeModalVerifyEmailComponent } from '../code-modal-verify-email/code-modal-verify-email.component';
import { LoadingServidorModalComponent } from '../loading-servidor-modal/loading-servidor-modal.component';
import { CloseModalesService } from '../close-modales.service';
import { Keyboard } from '@capacitor/keyboard';
import { FormControl, Validators } from '@angular/forms';


interface ServerResponse {
  message: string;
}

@Component({
  selector: 'app-registro-us',
  templateUrl: './registro-us.page.html',
  styleUrls: ['./registro-us.page.scss'],
})
export class RegistroUsPage implements OnInit {
  datos: any =  {
    Nombres: '',
    Apellidos: '',
    TipoDocumento: null,
    NumeroDocumento: null,
    Telefono: '',
    Ficha: '',
    TipoUsuario: '',
    CentroFormacion: '',
    Correo: '',
    Contrasena: '',
    confirmPassword: '',
    ImagenPerfil: ''
  };

  part: number = 1;
  primerNombre: string = '';
  
  loadingModal: any;

  showPhone = true;
  showUserType = true;
  showCenterAndFicha = false;



  constructor(private checkEmailService: CheckEmailService,private http: HttpClient, private router: Router, private toastController: ToastController,private modalController: ModalController, private closeModalesService: CloseModalesService, private alertController: AlertController) { }

  
  ngOnInit() {
    Keyboard.addListener('keyboardDidShow', () => {
      let formContainer = document.querySelector('.form-container') as HTMLElement;
      let loginButton = document.querySelector('.login-button-container') as HTMLElement;
      let logoContainer = document.querySelector('.logo-container') as HTMLElement; 
      let btnregistro = document.querySelector('.centered-btn-registro') as HTMLElement; 
    


      if (formContainer) {
        formContainer.style.top = '76%';
      }
      if (loginButton) {
        loginButton.style.display = 'none'; 
      }
      if (logoContainer) {
        logoContainer.style.marginTop = '0px'; 
      }
      if (btnregistro) {
        btnregistro.style.display = 'none'
      }

    });
    
    Keyboard.addListener('keyboardWillHide', () => {
      let formContainer = document.querySelector('.form-container') as HTMLElement;
      let loginButton = document.querySelector('.login-button-container') as HTMLElement;
      let logoContainer = document.querySelector('.logo-container') as HTMLElement;
      let btnregistro = document.querySelector('.centered-btn-registro') as HTMLElement; 

      if (formContainer) {
        formContainer.style.top = '66%';
      }
      if (loginButton) {
        loginButton.style.display = 'flex'; 
        loginButton.style.position = 'fixed'; 
        loginButton.style.bottom = '0'; 
      }
      if (logoContainer) {
        logoContainer.style.marginTop = '50px'; 
      }
      if (btnregistro) {
        btnregistro.style.display = 'flex';
        btnregistro.style.justifyContent = 'center';
      }

    });
  }

  async onUserTypeChange(event: any) {
    if (event.detail.value === 'estudiante') {
      const confirm = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de que quieres seleccionar "Estudiante"?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.datos.TipoUsuario = null; 
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.showUserType = false;
              this.showPhone = false;
              this.showCenterAndFicha = true;
            }
          }
        ]
      });
      await confirm.present();
    }
  }

  
  async onBackToPart2() {
    if (this.showCenterAndFicha) {
      this.showUserType = true;
      this.showPhone = true;
      this.showCenterAndFicha = false;
      this.datos.TipoUsuario = null; 
      this.datos.CentroFormacion = null; 
      this.datos.Ficha = null; 
      this.part = 3;
    } else {
      this.part = 2;
    }
  }



  Gologin() {
    this.router.navigate(['/login'])
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CodeModalVerifyEmailComponent,
      componentProps: {
        'datos': this.datos
      }
    });
    this.closeModalesService.addModal(modal);
    return await modal.present();
  }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  
  async siguiente() {
    let camposVacios = 0;
    let mensaje = '';
    
    // Parte 1 del formulario
  if (this.part == 1) {
    if (!this.datos.Nombres) {
      camposVacios++;
      mensaje = 'El nombre es obligatorio';
    } else {
      this.primerNombre = this.datos.Nombres.split(' ')[0];
    }

    if (!this.datos.Apellidos) {
      camposVacios++;
      mensaje = `${this.primerNombre}, el apellido es obligatorio`;
    }

    if (camposVacios > 1) {
      this.presentToast('faltan campos por llenar');
      return;
    } else if (camposVacios == 1) {
      this.presentToast(mensaje);
      return;
    } else {
      this.part++;
    }
  }
  
//Parte 2 del formulario
else if (this.part == 2) {
  if (!this.datos.TipoDocumento) {
    camposVacios++;
    mensaje = `${this.primerNombre}, el tipo de documento es obligatorio`;
  }
  if (!this.datos.NumeroDocumento) {
    camposVacios++;
    mensaje = `${this.primerNombre}, el número de documento es obligatorio`;
  }

  if (camposVacios > 1) {
    this.presentToast(`${this.primerNombre}, faltan campos por llenar`);
    return;
  } else if (camposVacios == 1) {
    this.presentToast(mensaje);
    return;
  } else {
    const documentoValido = await this.comprobarDocumentoExistente();
    if (!documentoValido) {
      return;
    }
  }
}

   // Parte 3 del formulario
else if (this.part == 3) {
  if (!this.datos.TipoUsuario) {
    camposVacios++;
    mensaje = `${this.primerNombre}, el tipo de usuario es obligatorio`;
  }
  if (this.datos.TipoUsuario === 'estudiante') {
    if (!this.datos.CentroFormacion) {
      camposVacios++;
      mensaje = `${this.primerNombre}, el centro de formación es obligatorio`;
    }
    if (!this.datos.Ficha) {
      camposVacios++;
      mensaje = `${this.primerNombre}, la ficha es obligatoria`;
    }
  }
  
  if (camposVacios > 1) {
    this.presentToast(`${this.primerNombre}, faltan campos por llenar`);
    return;
  } else if (camposVacios == 1) {
    this.presentToast(mensaje);
    return;
  } else {
    const telefonoValido = await this.comprobarTelefonoExistente();
    if (!telefonoValido) {
      return;
    }
  }
}
  }
  
  resetForm() {
    this.part = 1;
  }

  async comprobarDocumentoExistente(): Promise<boolean> {
    let body = new HttpParams()
      .set('NumeroDocumento', this.datos.NumeroDocumento);
  
    const headers = new HttpHeaders ({'Content-Type': 'application/x-www-form-urlencoded'});
    this.loadingModal = await this.modalController.create({
      component: LoadingServidorModalComponent
    });
    await this.loadingModal.present(); 
  
    try {
      const response = await this.http.post<ServerResponse>("https://rescueapprescue.000webhostapp.com/servidor/check_user_nit.php", body.toString(), { headers }).toPromise();
    
      console.log(response);
      if (response && response.message == 'Ya existe un usuario con ese número de documento') {
        this.presentToast('Número de documento existente');
        return false;
      } else {
        this.part++; 
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      await this.loadingModal.dismiss(); 
    }
  }
  async comprobarTelefonoExistente(): Promise<boolean> {
    if (this.datos.Telefono) {
      let body = new HttpParams()
        .set('Telefono', this.datos.Telefono);
      const headers = new HttpHeaders ({'Content-Type': 'application/x-www-form-urlencoded'});
  
      this.loadingModal = await this.modalController.create({
        component: LoadingServidorModalComponent
      });
      await this.loadingModal.present(); 
  
      try {
        const response = await this.http.post<ServerResponse>("https://rescueapprescue.000webhostapp.com/servidor/check_user_phone.php", body.toString(), { headers }).toPromise();
        console.log(response);
        if (response && response.message == 'Ya existe un usuario con ese número de teléfono') {
          this.presentToast('Número de teléfono existente');
          return false;
        } else {
          this.part++;
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        await this.loadingModal.dismiss(); 
      }
    } else {
      this.part++;
      return true;
    }
  }
  
  verificarTipoDocumento() {
    if (!this.datos.TipoDocumento) {
      let mensaje = `${this.primerNombre} primero seleccione un tipo de documento`;
      this.presentToast(mensaje);
    }
  }

  async enviar() {
    // Parte 4 del formulario (Ultima)
    if (this.part == 4) {
      let camposVacios = 0;
      let mensaje = '';
  
      if (!this.datos.Correo) {
        camposVacios++;
        mensaje = `${this.primerNombre}, el correo electrónico es obligatorio`;
      }
      if (!this.datos.Contrasena) {
        camposVacios++;
        mensaje = `${this.primerNombre}, la contraseña es obligatoria`;
      }
  
      if (camposVacios > 1) {
        this.presentToast(`${this.primerNombre}, faltan campos por llenar`);
        return;
      } else if (camposVacios == 1) {
        this.presentToast(mensaje);
        return;
      }
    }

    if (this.datos.Contrasena !== this.datos.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden.');
      return;
    }
  
    let body = new HttpParams().set('Correo', this.datos.Correo);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
 
    this.loadingModal = await this.modalController.create({
      component: LoadingServidorModalComponent
    });
  
    await this.loadingModal.present();
    this.closeModalesService.addModal(this.loadingModal);
  
    try {
      const response = await this.http.post<ServerResponse>("https://rescueapprescue.000webhostapp.com/servidor/check_user_correo.php", body.toString(), { headers }).toPromise();
      if (response && response.message === 'Ya existe un usuario con ese correo') {
        this.presentToast('Ya existe un usuario con ese correo');
        await this.loadingModal.dismiss(); 
      } else {
        this.checkEmailService.VerifyEmail(this.datos.Correo).subscribe(async (data: any) => {
          if (data.success) {
            this.presentToast('El correo electrónico se ha enviado correctamente.');
            await this.presentModal();
            this.resetForm()
            await this.loadingModal.dismiss(); 
          } else {
            this.presentToast('Ocurrió un error al enviar el correo electrónico:');
            await this.loadingModal.dismiss();
          }
        });
      }
    } catch (error) {
      console.error(error);
      await this.loadingModal.dismiss();
    }
  }

}

