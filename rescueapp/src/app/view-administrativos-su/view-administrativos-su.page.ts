import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ModalController } from '@ionic/angular';
import { EditProfileAdminSuModalComponent } from '../edit-profile-admin-su-modal/edit-profile-admin-su-modal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-admin-su',
  templateUrl: './view-administrativos-su.page.html',
  styleUrls: ['./view-administrativos-su.page.scss'],
})
export class ViewAdministrativosSuPage implements OnInit {
  admins: any[] = [];
  filteredAdmins: any[] = [];
  searchValue: string = ''; 
  constructor(private administrativosService: AdminService, private modalController: ModalController, private router:Router) {} 

  ngOnInit() {
    this.getAdministrativos();
  }

  getAdministrativos() {
    this.administrativosService.getAdministrativos().subscribe((data: any) => {
      if (data.success) {
        this.admins = data.administrativos;
        this.filteredAdmins = this.admins;
      } else {
        console.error(data.error);
      }
    }, (error: any) => {
      console.error(error);
    });
  }

  filterAdministrativos(searchValue: string | null | undefined) {
    if (!searchValue) {
      this.filteredAdmins = this.admins; 
    } else {
      this.filteredAdmins = this.admins.filter(admin => admin.NumeroDocumento.includes(searchValue)); 
    }
  }

  async openEditModal(admin: any) {
    const modal = await this.modalController.create({
      component: EditProfileAdminSuModalComponent,
      componentProps: {
        'admin': admin
      }
    });
    return await modal.present();
  }


  GoHomeSu() {
    this.router.navigate(['/home-superadmin'])
  }
  
  setDefaultSrc(event:any) {
    event.target.src = 'assets/defectprofile.png';
  }
}





