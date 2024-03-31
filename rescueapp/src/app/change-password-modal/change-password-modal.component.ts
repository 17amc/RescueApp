import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ChangePasswordService } from '../change-password.service';
import { CheckEmailService } from '../check-email.service';
import { LoadingServidorModalComponent } from '../loading-servidor-modal/loading-servidor-modal.component';
import { SuccesModalComponent } from '../succes-modal/succes-modal.component';
import { CloseModalesService } from '../close-modales.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit {

  @Input() email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loadingModal: any;

  constructor(private modalController: ModalController, private changePasswordService: ChangePasswordService, private toastController: ToastController, private checkEmailService: CheckEmailService, private closeModalesService: CloseModalesService) { }

  ngOnInit() {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  sendEmail() {
    this.checkEmailService.ChangeSucces(this.email).subscribe();
  }

  async dismissModal() {
    if (this.password !== this.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden.');
      return;
    }
    this.loadingModal = await this.modalController.create({
      component: LoadingServidorModalComponent
    });

    this.loadingModal.present();
    this.closeModalesService.addModal(this.loadingModal);

    this.changePasswordService.changePassword(this.email, this.password).subscribe(async (data: any) => {
      if (data.success) {
        this.presentToast('La contraseña se ha cambiado correctamente.');
        const modal = await this.modalController.create({
          component: SuccesModalComponent,
          backdropDismiss: false
        });
        this.closeModalesService.addModal(modal);
        await modal.present();
        setTimeout(() => {
          this.sendEmail();
        }, 10000); 
      } else {
        this.presentToast('Hubo un error al cambiar la contraseña.');
      }

      if (this.loadingModal) {
        await this.loadingModal.dismiss();
      }
    });
  }
}
