import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAdministrativosSuPage } from './view-administrativos-su.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAdministrativosSuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAdministrativosSuPageRoutingModule {}
