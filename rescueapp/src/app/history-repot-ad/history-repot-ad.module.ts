import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryRepotAdPageRoutingModule } from './history-repot-ad-routing.module';

import { HistoryRepotAdPage } from './history-repot-ad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryRepotAdPageRoutingModule
  ],
  declarations: [HistoryRepotAdPage]
})
export class HistoryRepotAdPageModule {}
