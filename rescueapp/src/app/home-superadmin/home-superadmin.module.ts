import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSuperadminPageRoutingModule } from './home-superadmin-routing.module';

import { HomeSuperadminPage } from './home-superadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSuperadminPageRoutingModule
  ],
  declarations: [HomeSuperadminPage]
})
export class HomeSuperadminPageModule {}
