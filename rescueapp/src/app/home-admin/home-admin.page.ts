import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  constructor(private router:Router, private storage: Storage) { }

  gohistoyreport() {
    this.router.navigate(['/history-repot-ad'])
  }
  
  cerrarSesion() {
    this.storage.remove('user');
    this.storage.remove('role');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
