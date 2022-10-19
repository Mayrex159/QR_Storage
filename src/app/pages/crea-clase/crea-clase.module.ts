import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreaClasePageRoutingModule } from './crea-clase-routing.module';

import { CreaClasePage } from './crea-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreaClasePageRoutingModule
  ],
  declarations: [CreaClasePage]
})
export class CreaClasePageModule {}
