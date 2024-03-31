import { Component, OnInit, Input } from '@angular/core';
import { DatosUsersService } from '../datos-users.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoadingServidorModalComponent } from '../loading-servidor-modal/loading-servidor-modal.component';
import { CheckEmailService } from '../check-email.service';
import { VerifyCodeService } from '../verify-code.service';
import { CodeModalVerifyEmailNuevoUsComponent } from '../code-modal-verify-email-nuevo-us/code-modal-verify-email-nuevo-us.component';

@Component({
  selector: 'app-update-data-contact-modal',
  templateUrl: './update-data-contact-modal.component.html',
  styleUrls: ['./update-data-contact-modal.component.scss'],
})
export class UpdateDataContactModalComponent  implements OnInit {

  @Input() user: any; 
  oldUser: any;
  loadingModal: any;
  constructor(private DatosUsersService: DatosUsersService, private toastController: ToastController,private modalController:ModalController, private storage: Storage, private checkEmailService: CheckEmailService, private verifyCodeService: VerifyCodeService) { }
  
  ngOnInit() {
   
    this.oldUser = JSON.parse(JSON.stringify(this.user));
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async updateUser() {
  
    if (JSON.stringify(this.user) === JSON.stringify(this.oldUser)) {
      this.modalController.dismiss();
      return;
    }

    this.loadingModal = await this.modalController.create({
      component: LoadingServidorModalComponent
    });
    await this.loadingModal.present();

    if (this.user.Correo !== this.oldUser.Correo) {
      this.checkEmailService.checkEmail(this.user.Correo).subscribe(async (data: any) => {
        if (data.message === 'El usuario existe') { 
          this.presentToast('Este correo electrónico ya existe');
          await this.loadingModal.dismiss();
        } else { 
          this.checkEmailService.VerifyEmailNuevoUs(this.user.Correo).subscribe(async (data: any) => {
            if (data.success) {
              const codeModal = await this.modalController.create({
                component: CodeModalVerifyEmailNuevoUsComponent,
                componentProps: {
                  email: this.user.Correo
                }
              });
              await codeModal.present();
              const { data } = await codeModal.onDidDismiss();
              if (data.success) {
                this.user.Correo = data.email;
                this.updateUserData();
              } else {
                await this.loadingModal.dismiss();
              }
            } else {
              this.presentToast('Error al enviar el correo electrónico de verificación');
              await this.loadingModal.dismiss();
            }
          });
        }
      });
    } else {
      this.updateUserData();
    }
  }

  async updateUserData() {
    this.DatosUsersService.updateUser(this.user).subscribe(async(data: any) => {
      await this.loadingModal.dismiss();
      if (data.success) {
        this.presentToast('Datos actualizados con exito');
        await this.storage.set('user', this.user);
        this.modalController.dismiss();
      } else {
        this.presentToast('Error al actualizar tus datos');
      }
    });
  }
}
