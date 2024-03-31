import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-superadmin',
  templateUrl: './home-superadmin.page.html',
  styleUrls: ['./home-superadmin.page.scss'],
})
export class HomeSuperadminPage {

  constructor(private navCtrl: NavController,
    private storage: Storage,
    private router: Router) {}

  verUsuarios() {
    this.navCtrl.navigateForward('/view-users');
  }
   editarUsuarios() {
    this.navCtrl.navigateForward('/edit-users');
  }
  verAdmin() {
    this.navCtrl.navigateForward('/view-administrativos-su');
  }

  cerrarSesion() {
    this.storage.remove('user');
    this.storage.remove('role');
    this.router.navigate(['/login']);
  }

}
