import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { StorageActService } from 'src/app/services/storage-act.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //variables:
  usuario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });

  loguearse: any = {
    correo: '',
    clave: '',
    activo: false
  }

  loguearses: any[] = [];
  KEY_LOGUEATE = 'loguearses'

  personas: any[] = [];
  KEY_PERSONAS = 'personas'

  constructor(private router: Router, private usuarioService: UsuarioService, private storage: StorageServiceService, private storageAct: StorageActService) { }

  async ngOnInit() {
    
    var administrador = {
      rut: '18.936.605-1',
      nombre: 'Maycoll',
      ap_paterno: 'Coronado',
      fecha_nac: '1995-01-25',
      correo: 'administrador@duoc.cl',
      clave: 'administrador',
      tipo_usuario: 'administrador',
      especialidad: '',
      semestre: ''
    };

    await this.storage.agregar(this.KEY_PERSONAS, administrador);
  }

  //crear nuestro métodos:
  async ingresar() {
    //rescatamos las variables del formulario por separado:
    var correoValidar = this.usuario.controls.correo.value;
    var claveValidar = this.usuario.controls.clave.value;
    
    //rescatamos el usuario con el método login usuario:
    
    var usuarioStorage = await this.storage.loginUsuario(correoValidar, claveValidar);
    //validamos si existe el usuario
    if (usuarioStorage != undefined) {

      //variables para guardar los datos en storage
      this.loguearse.correo = this.usuario.controls.correo.value;
      this.loguearse.clave = this.usuario.controls.clave.value;
      this.loguearse.activo = true
      //UNA VEZ QUE VALIDO QUE EXISTE, ENVIARE ESOS DATOS A LA SIGUIENTE PÁGINA:
      let navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioStorage          
        }
      };
      
      await this.storageAct.agregar(this.KEY_LOGUEATE, this.loguearse);
      //PARA ENVIAR EL DATO QUE ESTA LISTO, SE ANEXA AL ROUTER!
      this.router.navigate(['/home'], navigationExtras);
      
    }
    else {
      alert('Usuario o contraseña incorrectos!')
    }
  }

}
