import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { VerifyCodeService } from '../verify-code.service';

@Component({
  selector: 'app-code-modal-verify-email-nuevo-us',
  templateUrl: './code-modal-verify-email-nuevo-us.component.html',
  styleUrls: ['./code-modal-verify-email-nuevo-us.component.scss'],
})
export class CodeModalVerifyEmailNuevoUsComponent implements OnInit {

  @Input() email: string = "";
  code: string = "";

  constructor(private modalController: ModalController, private toastController: ToastController, private verifyCodeService: VerifyCodeService) { }

  ngOnInit() {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  dismissModal() {
    this.verifyCodeService.verifyCode(this.email, this.code).subscribe((data: any) => {
      if (data.success) {
        this.presentToast('Código verificado con éxito');
        this.modalController.dismiss({ success: true, email: this.email });
      } else {
        this.presentToast('Código incorrecto');
      }
    });
  }
}