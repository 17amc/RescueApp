import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataUserPage } from './data-user.page';

const routes: Routes = [
  {
    path: '',
    component: DataUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataUserPageRoutingModule {}
