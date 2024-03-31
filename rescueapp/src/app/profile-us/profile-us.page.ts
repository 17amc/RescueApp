import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateDateUserComponent } from '../update-date-user/update-date-user.component';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-us',
  templateUrl: './profile-us.page.html',
  styleUrls: ['./profile-us.page.scss'],
})
export class ProfileUsPage implements OnInit {

  constructor(public modalController: ModalController, private storage: Storage, private router:Router) {
  }

  ngOnInit() {
  }

  Godatauser() {
    this.router.navigate(['/data-user'])
  }

  async openModal() {
    const user = await this.storage.get('user'); 
    const modal = await this.modalController.create({
      component: UpdateDateUserComponent,
      componentProps: {
        'user': user
      }
    });
    return await modal.present();
  }


  async logout() {
    await this.storage.remove('user');
    await this.storage.remove('role');
    this.router.navigate(['/login']);
  }
  
}
