import { Component, OnInit, Input } from '@angular/core';
import { DatosUsersService } from '../datos-users.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoadingServidorModalComponent } from '../loading-servidor-modal/loading-servidor-modal.component';

@Component({
  selector: 'app-update-data-login-modal',
  templateUrl: './update-data-login-modal.component.html',
  styleUrls: ['./update-data-login-modal.component.scss'],
})
export class UpdateDataLoginModalComponent  implements OnInit {
  @Input() user: any; 
  confirm: string = '';
  newPassword: string = '';
  loadingModal: any;

  constructor(private DatosUsersService: DatosUsersService, private toastController: ToastController, private modalController: ModalController, private storage:Storage) { }
  ngOnInit() {}


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async closeModal() {
    this.modalController.dismiss();
  }

  async updateUser() {
    if (this.newPassword === '' || this.confirm === '') {
      this.presentToast('La contraseña no puede estar vacía.');
      return;
    }

    if (this.newPassword.length < 8 || this.newPassword.length > 32) {
      this.presentToast('La contraseña debe tener entre 8 y 32 caracteres.');
      return;
    }

    if (!/[A-Z]/.test(this.newPassword)) {
      this.presentToast('La contraseña debe contener al menos una letra mayúscula.');
      return;
    }

    if (this.newPassword === this.user.Contrasena) {
      this.presentToast('La nueva contraseña debe ser diferente a la anterior.');
      return;
    }

    if (this.newPassword !== this.confirm) {
      this.presentToast('Las contraseñas no coinciden.');
      return;
    }

    this.user.Contrasena = this.newPassword;

    this.modalController.dismiss(); 
    this.loadingModal = await this.modalController.create({
      component: LoadingServidorModalComponent
    });
    await this.loadingModal.present();

    this.DatosUsersService.updateUser(this.user).subscribe(async(data: any) => {
      await this.loadingModal.dismiss();
      if (data.success) {
        this.presentToast('Datos actualizados con éxito');
        await this.storage.set('user', this.user);
      } else {
        this.presentToast('Error al actualizar tus datos');
      }
    });
  }
}
