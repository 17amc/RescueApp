import { Component, OnInit, Input } from '@angular/core';
import { DatosUsersService } from '../datos-users.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoadingServidorModalComponent } from '../loading-servidor-modal/loading-servidor-modal.component';
@Component({
  selector: 'app-update-data-personal-modal',
  templateUrl: './update-data-personal-modal.component.html',
  styleUrls: ['./update-data-personal-modal.component.scss'],
})
export class UpdateDataPersonalModalComponent  implements OnInit {
  @Input() user: any; 
  loadingModal: any;

  constructor(private DatosUsersService: DatosUsersService, private toastController: ToastController, private modalController:ModalController, private storage: Storage) { }
  ngOnInit() {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async updateUser() {
    this.modalController.dismiss(); 
    this.loadingModal = await this.modalController.create({
      component: LoadingServidorModalComponent
    });
    await this.loadingModal.present();
  
    this.DatosUsersService.updateUser(this.user).subscribe(async(data: any) => {
      await this.loadingModal.dismiss();
      if (data.success) {
        this.presentToast('Datos actualizados con exito');
        await this.storage.set('user', this.user);
      } else {
        this.presentToast('Error al actualizar tus datos');
      }
    });
  }
  
}
