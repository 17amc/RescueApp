import { Component, OnInit, Input } from '@angular/core';
import { DatosUsersService } from '../datos-users.service';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-date-user',
  templateUrl: './update-date-user.component.html',
  styleUrls: ['./update-date-user.component.scss'],
})
export class UpdateDateUserComponent  implements OnInit {
  @Input() user: any; 

  constructor(private DatosUsersService: DatosUsersService, private toastController: ToastController) { }

  ngOnInit() {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  updateUser() {
    this.DatosUsersService.updateUser(this.user).subscribe((data: any) => {
      if (data.success) {
        this.presentToast('Datos actualizados con exito');
      } else {
        this.presentToast('Error al actualizar tus datos');
      }
    });
  }
}

