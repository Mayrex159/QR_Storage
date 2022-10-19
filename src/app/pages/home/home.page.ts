import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageActService } from 'src/app/services/storage-act.service';
import { StorageClaseService } from 'src/app/services/storage-clase.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //variables de usuario que recibirá los datos que vienen desde login:
  usuario: any;
  cantidad: any;
  cantidadClase: any;
  login: any;

  constructor(private router: Router, private usuarioService: UsuarioService, private storage: StorageServiceService, private storageClase: StorageClaseService, private storageAct: StorageActService) { }

  async ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    this.cantidad = await this.storage.cantidadPersonas();
    this.cantidadClase = await this.storageClase.cantidadClases();
  }


  //método para logout:
  logout() {
    this.usuarioService.logout();
  }
}
