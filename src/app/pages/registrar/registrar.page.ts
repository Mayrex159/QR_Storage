import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  //variable grupo:
  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', [Validators.required]),
    //solo se validan correos de alumnos.
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duocuc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    semestre: new FormControl('', [Validators.required, Validators.minLength(1)]),
    //el tipo de usuario cuando se registrar en solo del tipo alumno.
    tipo_usuario: new FormControl('alumno', [Validators.required]),
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
    semestre: '',
  };
  
  personas: any[] = [];
  KEY_PERSONA = 'personas';


  constructor(private usuarioService: UsuarioService, private validaciones: ValidacionesService, private router: Router, private storage: StorageServiceService) { }

  ngOnInit() {
  }

  //métodos:
  registrar() {

    this.persona.rut = this.usuario.value.rut;
    this.persona.nombre = this.usuario.value.nombre;
    this.persona.ap_paterno = this.usuario.value.ap_paterno;
    this.persona.fecha_nac = this.usuario.value.fecha_nac;
    this.persona.correo = this.usuario.value.correo;
    this.persona.clave = this.usuario.value.clave;
    this.persona.tipo_usuario = this.usuario.value.tipo_usuario;    
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

    if (this.storage.agregar(this.KEY_PERSONA, this.persona)) {
      alert('Usuario registrado!');
      this.usuario.reset();
      this.repetir_clave = '';
      this.router.navigate(['/login']);
    } else {
      alert('Usuario ya existe!');
    }
  }

}
