import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { VerifyCodeService } from '../verify-code.service';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';
import { LoadingServidorModalComponent } from '../loading-servidor-modal/loading-servidor-modal.component';
import { CloseModalesService } from '../close-modales.service';

@Component({
  selector: 'app-code-modal',
  templateUrl: './code-modal.component.html',
  styleUrls: ['./code-modal.component.scss'],
})
export class CodeModalComponent implements OnInit {

  @Input() email: string = '';
  code: string = '';
  loadingModal: any;

  constructor(private modalController: ModalController, private verifyCodeService: VerifyCodeService, private toastController: ToastController, private closeModalesService: CloseModalesService) { }

  ngOnInit() {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async dismissModal() {
    try {
      this.loadingModal = await this.modalController.create({
        component: LoadingServidorModalComponent
      });
  
      this.loadingModal.present();
      this.closeModalesService.addModal(this.loadingModal);
  
      const verifyCodeResponse: any = await this.verifyCodeService.verifyCode(this.email, this.code).toPromise();
  
      if (verifyCodeResponse.success) {
        this.presentToast('El código es correcto.');
        const modal = await this.modalController.create({
          component: ChangePasswordModalComponent,
          componentProps: {
            email: this.email
          },
          backdropDismiss: false
        });
        this.closeModalesService.addModal(modal);
        await modal.present();
      } else {
        this.presentToast('El código es incorrecto o ha vencido.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      if (this.loadingModal) {
        await this.loadingModal.dismiss();
      }
    }
  }
}
