import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloseModalesService } from '../close-modales.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-succes-reporte-us',
  templateUrl: './succes-reporte-us.component.html',
  styleUrls: ['./succes-reporte-us.component.scss'],
})
export class SuccesReporteUsComponent  implements OnInit {

  constructor(private router:Router, private closeModalesService: CloseModalesService, private modalController: ModalController, ) { }

  ngOnInit() {}




  GoHomeUs() {
    this.closeModalesService.closeAll();
    this.router.navigate(['/home']); 
  }



}
