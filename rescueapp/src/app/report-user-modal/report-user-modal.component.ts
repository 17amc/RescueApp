import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoadingServidorModalComponent } from '../loading-servidor-modal/loading-servidor-modal.component';
import { SuccesReporteUsComponent } from '../succes-reporte-us/succes-reporte-us.component';
import { CheckEmailService } from '../check-email.service';
import { CloseModalesService } from '../close-modales.service';

interface ServerResponse {
  message: string;
  success: boolean;
  status: string; 
  path: string; 

}

@Component({
  selector: 'app-report-user-modal',
  templateUrl: './report-user-modal.component.html',
  styleUrls: ['./report-user-modal.component.scss'],
})
export class ReportUserModalComponent  implements OnInit {
reporte: any = {
  Lugar: '',
  Categoria: '',
  Descripcion: ''
};

user: any;
part: number = 1;
loadingModal: any;
primerNombre: string = '';
primerApellido: string = '';

constructor(private http: HttpClient, private router: Router, private toastController: ToastController,private modalController: ModalController, private storage: Storage, private checkEmailService: CheckEmailService, private closeModalesService:CloseModalesService) { 
  this.cargarUsuario();
}


async cargarUsuario() {
  this.user = await this.storage.get('user');
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
    this.primerNombre = this.user.Nombres.split(' ')[0];
    if (this.part == 1) {
      this.part++;
    }
    else if (this.part == 2) {
      if (!this.reporte.Lugar) {
        camposVacios++;
        mensaje = `${this.primerNombre},Debes escribir el lugar del incidente`;
      }
      if (camposVacios > 0) {
        this.presentToast(mensaje);
        return;
      } else {
        this.part++;
      }
    }
    else if (this.part == 3) {
      if (!this.reporte.CategoriaID) {
        camposVacios++;
        mensaje =`${this.primerNombre},Debes seleccionar una categoría`;
      }
      if (camposVacios > 0) {
        this.presentToast(mensaje);
        return;
      } else {
        this.part++;
      }
    }   
  }
  
  sendEmail() {
    this.checkEmailService.sedReportesGmail(
      this.reporte.CategoriaID,
      this.user.ID,
      this.user.Nombres.split(' ')[0] + ' ' + this.user.Apellidos.split(' ')[0],
      this.user.Ficha,
      this.reporte.Lugar,
      this.reporte.Descripcion).subscribe();
}


  async enviarReport() {
    let camposVacios = 0;
    let mensaje = '';
    this.primerNombre = this.user.Nombres.split(' ')[0];
    
    if (this.part == 4) {
      if (!this.reporte.Descripcion) {
        camposVacios++;
        mensaje =  `${this.primerNombre}, Debes escribir una descripcion`;
      }
      if (camposVacios > 0) {
        this.presentToast(mensaje);
        return;
      }
    }
  
    let body = new HttpParams()
      .set('UsuarioID', this.user.ID)
      .set('Nombre', this.user.Nombres.split(' ')[0] + ' ' + this.user.Apellidos.split(' ')[0])
      .set('Ficha', this.user.Ficha)
      .set('Lugar', this.reporte.Lugar)
      .set('CategoriaID', this.reporte.CategoriaID)
      .set('Descripcion', this.reporte.Descripcion)
      
    const headers = new HttpHeaders ({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    const loadingModal = await this.modalController.create({
      component: LoadingServidorModalComponent
    });
    await loadingModal.present();
  
    this.http.post<ServerResponse>("https://rescueapprescue.000webhostapp.com/servidor/reporte_user.php", body.toString(), { headers }).toPromise()
      .then(async snap => {
        if (snap && snap.message === 'reporte enviado con exito') {
          this.presentToast('Reporte enviado');

          this.sendEmail()
  
          const successModal = await this.modalController.create({
            component: SuccesReporteUsComponent,
            backdropDismiss: false

          });
          this.closeModalesService.addModal(successModal);
          await successModal.present();
  
          await loadingModal.dismiss();
        } else {
          await loadingModal.dismiss();
  
          this.presentToast('Error al guardar el reporte');
        }
      })
      .catch(async error => {
        await loadingModal.dismiss();
  
        console.error('Hubo un error en la solicitud HTTP', error);
      });
  }

  ngOnInit() {}
}
