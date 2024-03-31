import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CloseModalesService } from '../close-modales.service';

@Component({
  selector: 'app-succes-modal',
  templateUrl: './succes-modal.component.html',
  styleUrls: ['./succes-modal.component.scss'],
})
export class SuccesModalComponent implements OnInit {

  constructor(private modalController: ModalController, private router: Router, private closeModalesService: CloseModalesService) { }

  ngOnInit() {}

  async Gologin() {
    this.closeModalesService.closeAll();
    this.router.navigate(['/login']); 
  }
}
