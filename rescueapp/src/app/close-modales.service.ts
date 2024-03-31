import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloseModalesService {
  shouldCloseAllModals: any;


  constructor() { }
  private modals: any[] = [];

  addModal(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  closeAll() {
    this.modals.map(modal => modal.dismiss());
    this.modals = [];
  }

  closeAllnew() {
    Promise.all(this.modals.map(modal => modal.dismiss())).then(() => {
      this.modals = [];
    });
  }
}
 
