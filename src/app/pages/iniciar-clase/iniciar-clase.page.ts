import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StorageAsistenciaService } from 'src/app/services/storage-asistencia.service';
import { StorageClaseService } from 'src/app/services/storage-clase.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-iniciar-clase',
  templateUrl: './iniciar-clase.page.html',
  styleUrls: ['./iniciar-clase.page.scss'],
})
export class IniciarClasePage implements OnInit {

  //VARIABLES PARA OBTENER INFORMACIÓN DEL PROFESOR
  rut: string;
  usuario: any;
  profesores: any[] = [];
  clases: any[] = [];

  //CREAR VARIABLES PARA EL QR:
  elementType = 'canvas';
  value = '';


  asistencia: any = {
    idAsistencia: '',
    idClase: '',
    qr: '',
    fecha: new Date(),
    alumnos: []
  }

  asistencias: any[] = [];
  personas: any[] = [];

  //LLAVE:
  KEY_ASISTENCIA = 'asistencias';
  KEY_PERSONAS = 'personas';

  constructor(private activatedRouter: ActivatedRoute, private storageAsistencia: StorageAsistenciaService, private usuarioService: UsuarioService, private storagePersona: StorageServiceService, private storageClase: StorageClaseService, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    this.rut = this.activatedRouter.snapshot.paramMap.get('rut');
    this.usuario = await this.storagePersona.obtenerDato(this.KEY_PERSONAS, this.rut);


    await this.obtenerClase();
    await this.obtenerProfesor();
  }


  async cargarAsistencias() {
    this.asistencias = await this.storageAsistencia.obtenerDatos(this.KEY_ASISTENCIA);
  }

  async registrar(id, value) {
    this.asistencia.idClase = id;
    this.asistencia.qr = value;
    this.asistencia.idAsistencia = await this.storageAsistencia.generarId(this.KEY_ASISTENCIA);
    var respuesta: boolean = await this.storageAsistencia.agregar(this.KEY_ASISTENCIA, this.asistencia);
    if (respuesta) {
      alert('Asistencia Creada');
      await this.cargarAsistencias();
    };
  }



  //Metodo para obtener los profesores
  async obtenerProfesor() {
    let arrProfesores = await this.storagePersona.obtenerDatos('personas');
    this.profesores = arrProfesores.filter(profesor => profesor.tipo_usuario === 'profesor');
  }

  //Metodo para obtener las clases
  async obtenerClase() {
    let arrClases = await this.storageClase.obtenerDatos('clases');
    this.clases = arrClases.filter(clases => clases);
  }




  //Metodo para el profesor Crear la asistencia
  async generarQR(id) {
    if (this.value == '') {
      this.value = v4();
      await this.registrar(id, this.value)
    }
    console.log(this.value);
  }


  //METODO DE LOADING:
  async cargando(mensaje) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }




}
