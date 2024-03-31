import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastController, ModalController, ActionSheetController  } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingServidorModalComponent } from '../loading-servidor-modal/loading-servidor-modal.component';
import { SuccesModalComponent } from '../succes-modal/succes-modal.component';
import { CloseModalesService } from '../close-modales.service';

interface ServerResponse {
  message: string;
  success: boolean;
  status: string; 
  path: string; 
}

@Component({
  selector: 'app-image-profile-modal',
  templateUrl: './image-profile-modal.component.html',
  styleUrls: ['./image-profile-modal.component.scss'],
})

export class ImageProfileModalComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  datos: any;
  loadingModal: any;

  constructor(private toastController: ToastController, private http: HttpClient, private modalController: ModalController, private actionSheetController: ActionSheetController, private closeModalesService:CloseModalesService) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  selectImage() {
    this.fileInput.nativeElement.click();
  }



 async openActionSheet() {
  type ButtonOption = {
    text: string;
    handler: () => void;
    role?: "destructive" | "cancel";
  };

  let buttons: ButtonOption[] = [
    {
      text: this.datos?.ImagenPerfil ? 'Cambiar imagen' : 'Elegir imagen',
      handler: () => {
        this.selectImage();
      }
    }
  ];

  if (this.datos?.ImagenPerfil) {
    buttons.push({
      text: 'Eliminar imagen',
      role: 'destructive',
      handler: () => {
        this.deleteImage();
      }
    });
  }

  buttons.push({
    text: 'Cancelar',
    role: 'cancel',
    handler: () => {
      console.log('Cancel clicked');
    }
  });

  const actionSheet = await this.actionSheetController.create({
    header: 'Imagen de perfil',
    buttons: buttons
  });

  await actionSheet.present();
}

  
  
async deleteImage(): Promise<void> {
  this.loadingModal = await this.modalController.create({
    component: LoadingServidorModalComponent
  });
  this.loadingModal.present();
  this.closeModalesService.addModal(this.loadingModal);
  

  const formData = new FormData();
  const filename = this.datos.ImagenPerfil.split('/').pop().split('?')[0];
  formData.append('ImagenPerfil', filename);

  try {
    const response = await this.http.post<ServerResponse>("https://rescueapprescue.000webhostapp.com/servidor/delete_image_profile.php", formData).toPromise();

    if (this.loadingModal) {
      await this.loadingModal.dismiss();
    }
    if (response && response.status === 'success') {
      this.presentToast('Imagen eliminada con éxito');
      this.datos.ImagenPerfil = null;
    } else {
      this.presentToast('Error al eliminar la imagen');
    }
  } catch (error) {
   
    if (this.loadingModal) {
      await this.loadingModal.dismiss();
    }
    this.presentToast('Error al eliminar la imagen');
    console.error('Error al eliminar la imagen:', error);
  }
}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.datos.ImagenPerfil = file;
      this.uploadImage().then((path) => {
        console.log('Imagen subida con éxito. Ruta de la imagen:', path);
        this.datos.ImagenPerfil = path + '?' + new Date().getTime(); 
      }).catch((error) => {
        console.error('Error al subir la imagen:', error);
      });
    }
  }
  
  async uploadImage(): Promise<string> {

    this.loadingModal = await this.modalController.create({
      component: LoadingServidorModalComponent
    });

    this.loadingModal.present();
    this.closeModalesService.addModal(this.loadingModal);
  
    const img = new Image();
    img.src = URL.createObjectURL(this.datos.ImagenPerfil);
    const promise = new Promise<string>((resolve, reject) => {
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const jpgDataUrl = canvas.toDataURL('image/png');
          const blob = await (await fetch(jpgDataUrl)).blob();         
          const jpgFile = new File([blob], 'PROFILE_' + this.datos.NumeroDocumento + '.jpg', { type: 'image/jpg' });
          this.datos.ImagenPerfil = jpgFile;
  
          let formData = new FormData();
          formData.append('ImagenPerfil', this.datos.ImagenPerfil);
        
          const snap = await this.http.post<ServerResponse>("https://rescueapprescue.000webhostapp.com/servidor/upload.php", formData).toPromise();
          if (this.loadingModal) {
            await this.loadingModal.dismiss();
          }
          if (snap && snap.status === 'success') {
            resolve(snap.path);
            this.presentToast('Exito imagen subida');
          } else {
            this.presentToast('Error al subir la imagen');
            reject('Error al subir la imagen');
          }
        }
      };
    });
    return promise;
  }

  async finishProces() {
  await this.closeModalesService.closeAll(); 
    const modal = await this.modalController.create({
      component: SuccesModalComponent,
      backdropDismiss: false
    });
    this.closeModalesService.addModal(modal);
    return await modal.present(); 
}
  

  ngOnInit() {}
}
