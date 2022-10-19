import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciarClasePage } from './iniciar-clase.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarClasePageRoutingModule {}
