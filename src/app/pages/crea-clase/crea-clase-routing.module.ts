import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreaClasePage } from './crea-clase.page';

const routes: Routes = [
  {
    path: '',
    component: CreaClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreaClasePageRoutingModule {}
