import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-profile-admin-su-modal',
  templateUrl: './edit-profile-admin-su-modal.component.html',
  styleUrls: ['./edit-profile-admin-su-modal.component.scss'],
})
export class EditProfileAdminSuModalComponent implements OnInit {
  @Input() admin: any;

  constructor(private modalController: ModalController, private adminService: AdminService) {}

  ngOnInit() {}

  guardarCambios() {
  console.log(this.admin);
    this.adminService.editAdministrativo(this.admin).subscribe((data: any) => {
      if (data.success) {
        this.modalController.dismiss();
      } else {
        console.error(data.error);
      }
    }, (error: any) => {
      console.error(error);
    });
  }
}

