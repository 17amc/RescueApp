import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryReportUsPageRoutingModule } from './history-report-us-routing.module';

import { HistoryReportUsPage } from './history-report-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryReportUsPageRoutingModule
  ],
  declarations: [HistoryReportUsPage]
})
export class HistoryReportUsPageModule {}
