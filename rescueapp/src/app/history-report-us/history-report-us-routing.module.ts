import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryReportUsPage } from './history-report-us.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryReportUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryReportUsPageRoutingModule {}
