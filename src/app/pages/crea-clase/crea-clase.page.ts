import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { StorageClaseService } from 'src/app/services/storage-clase.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';


@Component({
  selector: 'app-crea-clase',
  templateUrl: './crea-clase.page.html',
  styleUrls: ['./crea-clase.page.scss'],
})
export class CreaClasePage implements OnInit {

  //Variables para crear clases
  clase: any = {
    id: '',
    nombre: '',
    sigla: '',
    profesor: '',
  }
  clases: any[] = [];
  profesores: any[] = [];

  //LLave :
  KEY_CLASE = 'clases';

  constructor(private storage: StorageClaseService, private loadingCtrl: LoadingController, private storagePersona: StorageServiceService, private alertController: AlertController) { }

  async ngOnInit() {
    await this.cargarClases();
    await this.obtenerProfesor();

  }

  //CARGAR TODAS LAS Clases QUE VIENEN DESDE EL STORAGE:
  async cargarClases() {
    this.clases = await this.storage.obtenerDatos(this.KEY_CLASE);
  }

  async registrar() {
    this.clase.id = await this.storage.generarId(this.KEY_CLASE);
    var respuesta: boolean = await this.storage.agregar(this.KEY_CLASE, this.clase);
    if (respuesta) {
      alert('Clase Registrada');
      await this.cargarClases();
      this.limpiarClase();
    };
  }

  async eliminar(id) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea eliminar la clase de id ' + id + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('NO ELIMINA!');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            await this.storage.eliminar(this.KEY_CLASE, id);
            await this.cargando('eliminando...');
            await this.cargarClases();
          },
        },
      ],
    });
    await alert.present();

  }

  async buscar(id) {
    document.getElementById('id');
    this.clase = await this.storage.obtenerDato(this.KEY_CLASE, id);
    console.log(this.buscar);
  }

  async modificar() {
    await this.storage.actualizar(this.KEY_CLASE, this.clase);
    await this.cargando('actualizando Clases...');
    await this.cargarClases();
    this.limpiarClase();
  }

  //METODO DE LOADING:
  async cargando(mensaje) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }

  async obtenerProfesor() {
    let arrProfesores = await this.storagePersona.obtenerDatos('personas');
    this.profesores = arrProfesores.filter(profesor => profesor.tipo_usuario === 'profesor');
  }

  //METODO PARA LIMPIAR
  limpiarClase() {
    this.clase = {
      id: '',
      nombre: '',
      sigla: '',
      profesor: '',
    }
  }

}