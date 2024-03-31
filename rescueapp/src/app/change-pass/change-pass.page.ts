import { Component, OnInit } from '@angular/core';
import { CheckEmailService } from '../check-email.service';
import { ToastController, ModalController } from '@ionic/angular';
import { CodeModalComponent } from '../code-modal/code-modal.component';
import { LoadingServidorModalComponent } from '../loading-servidor-modal/loading-servidor-modal.component';

import { CloseModalesService } from '../close-modales.service';


@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})

export class ChangePassPage implements OnInit {

  email: string = '';
  loadingModal: any;

  constructor(private checkEmailService: CheckEmailService, private toastController: ToastController, private modalController: ModalController, private closeModalesService: CloseModalesService) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CodeModalComponent,
      componentProps: {
        'email': this.email
      }
    });
    this.closeModalesService.addModal(modal);
    return await modal.present();
  }
  
  async sendEmail() {
    try {
      this.loadingModal = await this.modalController.create({
        component: LoadingServidorModalComponent
      });
  
      this.loadingModal.present();
  
      const emailCheckResponse: any = await this.checkEmailService.checkEmail(this.email).toPromise();
  
      if (emailCheckResponse.message === 'El usuario existe') {
        const changePasswordResponse: any = await this.checkEmailService.changePassword(this.email).toPromise();
  
        if (changePasswordResponse.success) {
          this.presentToast('El correo electrónico se ha enviado correctamente.');
          this.presentModal();
        } else {
          this.presentToast('Ocurrió un error al enviar el correo electrónico: ' + changePasswordResponse.message);
        }
      } else {
        this.presentToast('No existe un usuario con ese correo electrónico');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      if (this.loadingModal) {
        await this.loadingModal.dismiss();
      }
    }
  }
  
  
  ngOnInit() {
  }
}
