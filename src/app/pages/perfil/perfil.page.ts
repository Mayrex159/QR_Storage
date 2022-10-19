import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageClaseService } from 'src/app/services/storage-clase.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  rut: string;
  usuario: any = {};
  correo: any;

  fecha_nac: any;
  nombre: any;
  ap_paterno: any;
  tipo_usuario: any;

  personas: any[] = [];
  KEY_PERSONAS = 'personas';

  //CREAR ARREGLO PARA GUARDAR LA LISTA

  constructor(private activatedRouter: ActivatedRoute, private storagePersona: StorageServiceService) { }

  async ngOnInit() {
    this.rut = this.activatedRouter.snapshot.paramMap.get('rut');
    this.usuario = await this.storagePersona.obtenerDato(this.KEY_PERSONAS, this.rut);
    this.correo = await this.usuario.correo;
    this.rut = await this.usuario.rut;
    this.fecha_nac = await this.usuario.fecha_nac;
    this.ap_paterno = await this.usuario.ap_paterno;
    this.tipo_usuario = await this.usuario.tipo_usuario;
    this.nombre = await this.usuario.nombre;

  }



}
