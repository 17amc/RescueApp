import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { ReportUserModalComponent } from '../report-user-modal/report-user-modal.component';
import { CloseModalesService } from '../close-modales.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private modalController: ModalController, private closeModalesService: CloseModalesService ) {}


  Goprofile() {
    this.router.navigate(['/profile-us']);
  }

  viewreport() {
    this.router.navigate(['/history-report-us']);
  }

  async presentModalReport() {
    const modal = await this.modalController.create({
      component: ReportUserModalComponent,
      });
    this.closeModalesService.addModal(modal);
    return await modal.present();
  }
}
