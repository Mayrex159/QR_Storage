import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'administrador',
        loadChildren: () => import('../administrador/administrador.module').then(m => m.AdministradorPageModule),

      },
      {
        path: 'perfil/:rut',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)

      }, {
        path: 'crea-clase',
        loadChildren: () => import('../crea-clase/crea-clase.module').then(m => m.CreaClasePageModule)

      }, {
        path: 'iniciar-clase/:rut',
        loadChildren: () => import('../iniciar-clase/iniciar-clase.module').then(m => m.IniciarClasePageModule)
      }, {
        path: 'tomar-asistencia/:rut',
        loadChildren: () => import('../tomar-asistencia/tomar-asistencia.module').then(m => m.TomarAsistenciaPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
