import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private storage: Storage,  private loadingController: LoadingController) {
    this.storage.create();
  }

  async ngOnInit() {

    this.router.navigate(['/loading']);
  
      const role = await this.storage.get('role');
      if (role != null) {
        if (role == 'superadmin') {
          this.router.navigate(['/home-superadmin']);
        } else if (role == 'administrativo') {
          this.router.navigate(['/home-admin']);
        } else {
          this.router.navigate(['/home']);
        }
      } else {
        this.router.navigate(['/welcome']);
      }
  }
  
}
