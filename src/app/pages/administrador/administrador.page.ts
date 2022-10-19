import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  //Variables para crear usuarios dependiendo del tipo storage:

  //variable grupo:
  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', [Validators.required]),
    //solo se validan correos de alumnos.
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    especialidad: new FormControl('',),
    semestre: new FormControl('',),
    //el tipo de usuario cuando se registrar en solo del tipo alumno.
    tipo_usuario: new FormControl('', [Validators.required]),
  });
  repetir_clave: string;

  persona: any = {
    rut: '', 
    nombre: '',
    ap_paterno: '',
    fecha_nac: '',
    correo: '',
    clave: '',
    tipo_usuario: '',
    especialidad: '',
    semestre: '',
  };

  personas: any[] = [];





  //LLAVE:
  KEY_PERSONAS = 'personas';

  constructor(private storage: StorageServiceService, private loadingCtrl: LoadingController, private router: Router, private validaciones: ValidacionesService, private alertController: AlertController) { }

  async ngOnInit() {
    await this.cargarPersonas();
  }


  //CARGAR TODAS LAS PERSONAS QUE VIENEN DESDE EL STORAGE:
  async cargarPersonas() {
    this.personas = await this.storage.obtenerDatos(this.KEY_PERSONAS);
  }

  async registrar() {
    this.persona.rut = this.usuario.value.rut;
    this.persona.nombre = this.usuario.value.nombre;
    this.persona.ap_paterno = this.usuario.value.ap_paterno;
    this.persona.fecha_nac = this.usuario.value.fecha_nac;
    this.persona.correo = this.usuario.value.correo;
    this.persona.clave = this.usuario.value.clave;
    this.persona.tipo_usuario = this.usuario.value.tipo_usuario;
    this.persona.especialidad = this.usuario.value.especialidad;
    this.persona.semestre = this.usuario.value.semestre;

    //validación de salida para buscar un rut válido.
    if (!this.validaciones.validarRut(this.persona.rut)) {
      alert('Rut incorrecto!');
      return;
    }
    //validación de salida para verificar que persona tenga al menos 17 años.
    if (!this.validaciones.validarEdadMinima(17, this.persona.fecha_nac)) {
      alert('Edad mínima 17 años!');
      return;
    }
    //validación de coincidencia de contraseñas.
    if (this.persona.clave != this.repetir_clave) {
      alert('Contraseñas no coinciden!');
      return;
    }

    let resp = await this.storage.agregar(this.KEY_PERSONAS, this.persona);
    if (resp) {
      alert('Usuario registrado!');
      this.usuario.reset();
      this.repetir_clave = '';
      await this.cargarPersonas();
    } else {
      alert('Usuario ya existe!');
    }
  }

  async eliminar(rut) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea eliminar al usuario de rut ' + rut + '?',
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
            await this.storage.eliminar(this.KEY_PERSONAS, rut);
            await this.cargando('eliminando...');
            await this.cargarPersonas();
          },
        },
      ],
    });
    await alert.present();

  }

  async buscar(rut) {
    document.getElementById('rut').setAttribute('disabled', 'true');
    let usuEncontrado = await this.storage.obtenerDato(this.KEY_PERSONAS, rut);
    this.usuario.setValue(usuEncontrado);
    
  }
  
  async modificar() {
    await this.storage.actualizar(this.KEY_PERSONAS, this.usuario.value);
    await this.cargando('actualizando personas...');    
    document.getElementById('rut').setAttribute('disabled', 'false');
    this.usuario.reset();
    await this.cargarPersonas();
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
