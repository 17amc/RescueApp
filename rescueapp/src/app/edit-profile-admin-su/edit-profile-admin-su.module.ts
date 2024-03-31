import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfileAdminSuPageRoutingModule } from './edit-profile-admin-su-routing.module';

import { EditProfileAdminSuPage } from './edit-profile-admin-su.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfileAdminSuPageRoutingModule
  ],
  declarations: [EditProfileAdminSuPage]
})
export class EditProfileAdminSuPageModule {}
