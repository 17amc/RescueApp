import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, ApiResponse } from '../user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile-su',
  templateUrl: './edit-profile-su.page.html',
  styleUrls: ['./edit-profile-su.page.scss'],
})
export class EditProfileSuPage implements OnInit {
  userId: number;
  user: any = {};
  errorMessage: string = '';
  part: number = 1;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private navCtrl: NavController
  ) {
    this.userId = 0; 
  }
  
  siguiente() {
    // Parte 1 del formulario
    if (this.part == 1) {
      this.part++;
    }
    
    // Parte 2 del formulario
    else if (this.part == 2) {
      this.part++;
    }
  
    // Parte 3 del formulario
    else if (this.part == 3) {
      this.part++;
    }
  }
  

  ngOnInit() {
    const userIdParam = this.route.snapshot.paramMap.get('id');
    
    if (userIdParam !== null) {
      this.userId = +userIdParam;
      this.getUserDetails();
    } else {
      console.error('Error: No se proporcionó el parámetro "id".');
      // Otra opción: mostrar un mensaje al usuario en la página actual
    }
  }
  

  getUserDetails() {
    this.userService.getUserById(this.userId).subscribe(
      (data: ApiResponse) => {
        if (data.success) {
          this.user = data.data || {};
          this.errorMessage = '';
        } else {
          this.errorMessage = data.message || 'Hubo un error al obtener los datos del usuario.';
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        this.errorMessage = 'Hubo un error en la solicitud.';
      }
    );
  }

  guardarCambios() {
    this.userService.updateUser(this.user).subscribe(
      (data: ApiResponse) => {
        if (data.success) {
          this.navCtrl.navigateBack('/view-users');
        } else {
          this.errorMessage = data.message || 'Hubo un error al actualizar el usuario.';
          console.error('Error en la respuesta del servidor:', data);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        this.errorMessage = 'Hubo un error en la solicitud.';
      }
    );
  }
  
}

