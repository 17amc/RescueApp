import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileAdminSuPage } from './edit-profile-admin-su.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileAdminSuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileAdminSuPageRoutingModule {}
