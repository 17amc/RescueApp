import { Component } from '@angular/core';
import { UserService, ApiResponse } from '../user.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: ['./view-users.page.scss'],
})
export class ViewUsersPage {

  users: any[] = [];
  filteredUsers: any[] = []; 
  errorMessage: string = '';
  documentNumber: string = '';

  constructor(private userService: UserService, private navCtrl: NavController, private router: Router) {}

  ionViewDidEnter() {
    this.getAllUsers(); 
  }

  filterUsers(searchValue: string | null | undefined) { 
    if (!searchValue) {
      this.filteredUsers = this.users; 
    } else {
      this.filteredUsers = this.users.filter(user => user.NumeroDocumento.includes(searchValue));
    }
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: ApiResponse) => {
        console.log('Respuesta exitosa:', data);
        if (data.success) {
          this.users = data.data || [];
          this.filteredUsers = this.users; 
          this.errorMessage = '';
        } else {
          this.errorMessage = data.message || 'Hubo un error al obtener los datos.';
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        this.errorMessage = 'Hubo un error en la solicitud.';
      }
    );
  }

  setDefaultSrc(event:any) {
    event.target.src = 'assets/defectprofile.png';
  }
  

  editarPerfil(user: any) {
    this.navCtrl.navigateForward(`/edit-profile-su/${user.ID}`);
  }


  GoHomeSu() {
    this.router.navigate(['/home-superadmin'])
  }
}
