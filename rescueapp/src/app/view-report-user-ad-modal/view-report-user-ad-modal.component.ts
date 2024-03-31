import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-view-report-user-ad-modal',
  templateUrl: './view-report-user-ad-modal.component.html',
  styleUrls: ['./view-report-user-ad-modal.component.scss'],
})
export class ViewReportUserAdModalComponent implements OnInit {
  @Input() reporte: any;
  nuevoEstado: string= "";
  administrativoID: string = "";

  constructor(private modalController: ModalController, private http: HttpClient, private storage: Storage, private actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    const user = await this.storage.get('user');
    this.administrativoID = user.ID;
  }

  cambiarEstadoReporte() {
    let body = new HttpParams()
      .set('ReporteID', this.reporte.ID)
      .set('NuevoEstado', this.nuevoEstado)
      .set('AdministrativoID', this.administrativoID);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post("https://rescueapprescue.000webhostapp.com/servidor/cambiar_estado_reporte.php", body.toString(), { headers })
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}

