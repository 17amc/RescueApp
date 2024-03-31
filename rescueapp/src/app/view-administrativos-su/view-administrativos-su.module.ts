import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAdministrativosSuPageRoutingModule } from './view-administrativos-su-routing.module';

import { ViewAdministrativosSuPage } from './view-administrativos-su.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAdministrativosSuPageRoutingModule
  ],
  declarations: [ViewAdministrativosSuPage]
})
export class ViewAdministrativosSuPageModule {}
