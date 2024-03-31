import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroUsPageRoutingModule } from './registro-us-routing.module';

import { RegistroUsPage } from './registro-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroUsPageRoutingModule
  ],
  declarations: [RegistroUsPage]
})
export class RegistroUsPageModule {}
