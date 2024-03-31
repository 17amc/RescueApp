import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { UpdateDataPersonalModalComponent } from '../update-data-personal-modal/update-data-personal-modal.component';
import { UpdateDataContactModalComponent } from '../update-data-contact-modal/update-data-contact-modal.component';
import { UpdateDataSenaModalComponent } from '../update-data-sena-modal/update-data-sena-modal.component';
import { UpdateDataLoginModalComponent } from '../update-data-login-modal/update-data-login-modal.component';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

interface ServerResponse {
  message: string;
  success: boolean;
  status: string; 
  path: string; 

}

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.page.html',
  styleUrls: ['./data-user.page.scss'],
})
export class DataUserPage implements OnInit {
  user: any;
  

  constructor(public modalController: ModalController,private storage: Storage,private router:Router, private toastController: ToastController, private http: HttpClient ) {
    this.cargarUsuario();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async cargarUsuario() {
    this.user = await this.storage.get('user');
  }

  
  async openModal() {
    const modal = await this.modalController.create({
      component: UpdateDataPersonalModalComponent,
      componentProps: {
        'user': this.user
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    
    if (data && data.updated) {
      this.cargarUsuario();
    }
  }

  async openModaldatacontact() {
    const modal = await this.modalController.create({
      component: UpdateDataContactModalComponent,
      componentProps: {
        'user': this.user
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    
    if (data && data.updated) {
      this.cargarUsuario();
    }
  }

  async openModaldatasena() {
    const modal = await this.modalController.create({
      component: UpdateDataSenaModalComponent,
      componentProps: {
        'user': this.user
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    
    if (data && data.updated) {
      this.cargarUsuario();
    }
  }

  async openModaldalogin() {
    const modal = await this.modalController.create({
      component: UpdateDataLoginModalComponent,
      componentProps: {
        'user': this.user
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    
    if (data && data.updated) {
      this.cargarUsuario();
    }
  }

  async uploadImage(): Promise<string> {
    let formData = new FormData();
    
    let extension = this.user.ImagenPerfil.name.split('.').pop();

  let nombreImagen = 'PROFILE_' + this.user.NumeroDocumento + '.' + extension;
    let imagenModificada = new File([this.user.ImagenPerfil], nombreImagen, { type: this.user.ImagenPerfil.type });
  
    formData.append('ImagenPerfil', imagenModificada);
  
    const snap = await this.http.post<ServerResponse>("https://rescueapprescue.000webhostapp.com/servidor/upload.php", formData).toPromise();
    if (snap && snap.status === 'success') {
      this.presentToast('Imagen de perfil actualizada');
      return snap.path;
    } else {
      this.presentToast('Error al subir la imagen');
      throw new Error('Error al subir la imagen');
    }
  }
  async changeProfileImage() {
    const imageSelector = document.createElement('input');
    imageSelector.setAttribute('type', 'file');
    imageSelector.click();
  
    imageSelector.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
  
      if (target && target.files) {
        const file = target.files[0];
        
  
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = async () => {
   
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          
         
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            
            const jpgDataUrl = canvas.toDataURL('image/jpg');
            const blob = await (await fetch(jpgDataUrl)).blob();
           
            const jpgFile = new File([blob], 'PROFILE_' + this.user.NumeroDocumento + '.jpg', { type: 'image/jpg' });
            this.user.ImagenPerfil = jpgFile;
            const newPath = await this.uploadImage();           
            this.user.ImagenPerfil = newPath;
            this.user.ImagenPerfil += '?' + new Date().getTime();
          }
        };
      }
    };
  }
  
  
  ngOnInit() {
  }
}
