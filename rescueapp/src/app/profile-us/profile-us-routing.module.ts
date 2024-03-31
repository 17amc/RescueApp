import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileUsPage } from './profile-us.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileUsPageRoutingModule {}
