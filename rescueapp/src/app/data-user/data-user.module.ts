import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataUserPageRoutingModule } from './data-user-routing.module';

import { DataUserPage } from './data-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataUserPageRoutingModule
  ],
  declarations: [DataUserPage]
})
export class DataUserPageModule {}
