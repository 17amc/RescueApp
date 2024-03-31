import { Component, OnInit } from '@angular/core';
import { HistoryReportUsService } from '../history-report-us.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-history-report-us',
  templateUrl: './history-report-us.page.html',
  styleUrls: ['./history-report-us.page.scss'],
})
export class HistoryReportUsPage implements OnInit {
  reportes: any[] = [];
  estadoFiltro: string = '';
  cargandoReportes = false;
  reportesCargados = false;
  loading: any;

  constructor(private historyReportUsService: HistoryReportUsService, private storage: Storage, private loadingController: LoadingController) { }

  async ngOnInit() {
    await this.storage.create();
    const user = await this.storage.get('user');
    this.loading = await this.loadingController.create({
      message: 'Cargando reportes...'
    });
    await this.loading.present();
    this.cargandoReportes = true;
    this.getReportes(user.ID);
  }

  getReportes(usuarioID: number) {
    this.historyReportUsService.getReportes(usuarioID).subscribe((data: any) => {
      if (data.success) {
        this.reportes = data.reportes.filter((reporte: { EstadoReporte: string; }) => this.estadoFiltro === '' || reporte.EstadoReporte === this.estadoFiltro);
        this.storage.set('reportes', this.reportes);
        this.cargandoReportes = false;
        this.reportesCargados = true;
        this.loading.dismiss();
      } else {
        console.error(data.error);
        this.reportes = [];
        this.storage.remove('reportes');
        this.cargandoReportes = false;
        this.reportesCargados = true;
        this.loading.dismiss();
      }
    }, (error: any) => {
      console.error(error);
      this.reportes = [];
      this.storage.remove('reportes');
      this.cargandoReportes = false;
      this.reportesCargados = true;
      this.loading.dismiss();
    });
  }

  cambiarFiltro(estado: string) {
    this.estadoFiltro = estado;
    this.storage.get('user').then(user => {
      this.getReportes(user.ID);
    });
  }
}
