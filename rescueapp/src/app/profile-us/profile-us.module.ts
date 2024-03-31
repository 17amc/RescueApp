import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileUsPageRoutingModule } from './profile-us-routing.module';

import { ProfileUsPage } from './profile-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileUsPageRoutingModule
  ],
  declarations: [ProfileUsPage]
})
export class ProfileUsPageModule {}
