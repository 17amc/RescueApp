import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Storage } from '@ionic/storage-angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ModalController, LoadingController, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { ViewReportUserAdModalComponent } from '../view-report-user-ad-modal/view-report-user-ad-modal.component';

interface Respuesta {
  success: boolean;
  reportes?: any[];
  error?: string;
}

@Component({
  selector: 'app-history-repot-ad',
  templateUrl: './history-repot-ad.page.html',
  styleUrls: ['./history-repot-ad.page.scss'],
})

export class HistoryRepotAdPage implements OnInit {
  reportes: any[] = [];
  private ultimosReportes: any[] = []; 
  private primeraVez = true; 
  private notificacionId = 1; 
  private loading: any;
  public cargandoReportes = false;
  public reportesCargados = false;
  private recienConectado = false;

  nuevoEstado: string= "";
  administrativoID: string = "";
  public estadoFiltro: string = '';
  private user: any; 
  private intervalo: any;
  private ultimaNotificacion: Date = new Date();

  constructor(private http: HttpClient, private storage: Storage, private modalController: ModalController, private loadingController: LoadingController, private actionSheetController: ActionSheetController,private alertController: AlertController, private toastController: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async ngOnInit() {
    this.user = await this.storage.get('user'); 
    this.administrativoID = this.user.ID;

    if (this.user && this.user.Especializacion) {
      this.loading = await this.loadingController.create({
        message: 'Cargando reportes...'
      });
      await this.loading.present();
      this.cargandoReportes = true;

      this.obtenerReportes(this.user.Especializacion);

      this.intervalo = setInterval(() => {
        this.obtenerReportes(this.user.Especializacion);
      }, 5000);
    }
  }

  async obtenerReportes(Especializacion: string) {
    const url = 'https://rescueapprescue.000webhostapp.com/servidor/history_report_ad.php';
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    let body = new HttpParams().set('Especializacion', Especializacion);
  
    try {
      const response = await this.http.post<Respuesta>(url, body.toString(), { headers: headers }).toPromise();
      if (response && response.success) {
        this.reportes = response.reportes ? response.reportes.filter(reporte => this.estadoFiltro === '' || reporte.EstadoReporte === this.estadoFiltro) : [];
        this.storage.set('reportes', this.reportes);

        const reportesIds = this.reportes.map(reporte => reporte.id);
        const ultimosReportesIds = this.ultimosReportes.map(reporte => reporte.id);

        if (!this.primeraVez && JSON.stringify(reportesIds) !== JSON.stringify(ultimosReportesIds)) {
          this.ultimosReportes = [...this.reportes];
        
          if (this.reportes.length > 0 && !this.recienConectado) {
            const reportesNuevos = this.reportes.filter(reporte => new Date(reporte.Fecha) > this.ultimaNotificacion);
            for (const reporte of reportesNuevos) {
              await LocalNotifications.schedule({
                notifications: [
                  {
                    title: 'Nuevo Reporte',
                    body: `¡Lugar del reporte: ${reporte.Lugar}!`,
                    id: this.notificacionId++ 
                  }
                ]
              });
            }
            this.ultimaNotificacion = new Date();
          }
          this.recienConectado = false;
        } else if (this.primeraVez) {
          this.ultimosReportes = [...this.reportes];
          this.primeraVez = false;
          this.cargandoReportes = false;
          this.reportesCargados = true;
          this.loading.dismiss();
        }
        
      } else {
        throw new Error(response ? response.error : 'No se recibió ninguna respuesta del servidor');
      }
    } catch (error) {
      this.reportes = await this.storage.get('reportes') || [];
      if (this.primeraVez) {
        this.loading.dismiss();
        this.primeraVez = false;
        this.cargandoReportes = false;
        this.reportesCargados = true;
      }
      this.recienConectado = true;
    }
  }

  cambiarFiltro(estado: string) {
    this.estadoFiltro = estado;
    if (this.user && this.user.Especializacion) { 
      this.obtenerReportes(this.user.Especializacion);
      clearInterval(this.intervalo);
      this.intervalo = setInterval(() => {
        this.obtenerReportes(this.user.Especializacion);
      }, 5000);
    }
  }
  
  async abrirModal(reporte: any) {
    const modal = await this.modalController.create({
      component: ViewReportUserAdModalComponent,
      cssClass: 'mi-modal-personalizado',
      componentProps: {
        'reporte': reporte
      }
    });
    return await modal.present();
  }
  async cambiarEstadoReporte(reporte: any) {
  let body = new HttpParams()
    .set('ReporteID', reporte.ID)
    .set('NuevoEstado', this.nuevoEstado)
    .set('AdministrativoID', this.administrativoID);

  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  this.http.post("https://rescueapprescue.000webhostapp.com/servidor/cambiar_estado_reporte.php", body.toString(), { headers })
    .subscribe(data => {
      console.log(data);
      this.presentToast('El estado del reporte se cambió correctamente.');
    }, error => {
      console.log(error);
      this.presentToast('Ocurrió un error al cambiar el estado del reporte.');
    });
}


  async presentActionSheet(event: Event, reporte: any) {
    event.stopPropagation();
    const actionSheet = await this.actionSheetController.create({
      header: 'Cambiar estado del reporte',
      buttons: [{
        text: reporte.EstadoReporte === 'Pendiente' ? 'Finalizado' : 'Pendiente',
        handler: () => {
          this.nuevoEstado = reporte.EstadoReporte === 'Pendiente' ? 'Finalizado' : 'Pendiente';
          this.presentConfirmationAlert(reporte);
        }
      }, {
        text: 'Cancelar',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }
  
  async presentConfirmationAlert(reporte: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Estás seguro de que quieres cambiar el estado del reporte a ${this.nuevoEstado}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.cambiarEstadoReporte(reporte);
          }
        }
      ]
    });
  
    await alert.present();
  }
}
