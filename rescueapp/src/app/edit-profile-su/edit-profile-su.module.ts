import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfileSuPageRoutingModule } from './edit-profile-su-routing.module';

import { EditProfileSuPage } from './edit-profile-su.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfileSuPageRoutingModule
  ],
  declarations: [EditProfileSuPage]
})
export class EditProfileSuPageModule {}
