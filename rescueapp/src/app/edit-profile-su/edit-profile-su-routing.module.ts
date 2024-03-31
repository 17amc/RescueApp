import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileSuPage } from './edit-profile-su.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileSuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileSuPageRoutingModule {}
