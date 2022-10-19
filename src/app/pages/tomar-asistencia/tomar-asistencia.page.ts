import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StorageAsistenciaService } from 'src/app/services/storage-asistencia.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-tomar-asistencia',
  templateUrl: './tomar-asistencia.page.html',
  styleUrls: ['./tomar-asistencia.page.scss'],
})
export class TomarAsistenciaPage implements OnInit {

  //VARIABLES PARA OBTENER INFORMACIÓN DEL ALUMNO
  rut: string;
  usuario: any = {};
  alumnoss: any[] = [];
  asistencia: any[] = [];

  asistencias: any[] = [];
  KEY_ASISTENCIA = 'asistencias';

  codigo_asistencia: string;

  personas: any[] = [];
  KEY_PERSONAS = 'personas'

  constructor(private activatedRouter: ActivatedRoute, private usuarioService: UsuarioService, private storagePersona: StorageServiceService, private storageAsistencia: StorageAsistenciaService, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    this.rut = this.activatedRouter.snapshot.paramMap.get('rut');
    this.usuario = await this.storagePersona.obtenerDato(this.KEY_PERSONAS, this.rut);

    await this.obtenerAlumno();
    await this.obtenerAsistencias()
  }




  //Metodo para obtener los alumnos del storage
  async obtenerAlumno() {
    let arrAlumnos = await this.storagePersona.obtenerDatos('personas');
    this.alumnoss = arrAlumnos.filter(alumno => alumno.tipo_usuario == 'Alumno');
  }

  async obtenerAsistencias() {
    let arrAsistencia = await this.storageAsistencia.obtenerDatos('asistencias');
    this.asistencia = arrAsistencia.filter(asistencia => asistencia);
  }

  //Metodo para el alumno tomar asistencia
  async leerQR() {
    alert('Asistencia Exitosa!')
    await this.storageAsistencia.actualizarAsistencia(this.KEY_ASISTENCIA, this.codigo_asistencia, this.usuario.rut);
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
