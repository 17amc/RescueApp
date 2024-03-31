import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryRepotAdPage } from './history-repot-ad.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryRepotAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRepotAdPageRoutingModule {}
