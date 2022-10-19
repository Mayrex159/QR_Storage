import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciarClasePageRoutingModule } from './iniciar-clase-routing.module';

import { IniciarClasePage } from './iniciar-clase.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciarClasePageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [IniciarClasePage]
})
export class IniciarClasePageModule { }
