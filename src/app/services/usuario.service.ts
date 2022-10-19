import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //variables:
  usuarios: any[] = [
    {
      rut: '18.936.605-1',
      nombre: 'Maycoll',
      ap_paterno: 'Coronado',
      fecha_nac: '1995-01-25',
      correo: 'administrador@duoc.cl',
      clave: 'administrador',
      tipo_usuario: 'administrador'
    }, {
      rut: '18.999.000-1',
      nombre: 'Cynthia',
      ap_paterno: 'Moreno',
      fecha_nac: '1994-06-09',
      correo: 'alumno@duocuc.cl',
      clave: 'alumno',
      tipo_usuario: 'alumno'
    }, {
      rut: '11.871.476-8',
      nombre: 'Sofia',
      ap_paterno: 'Renata',
      fecha_nac: '1993-06-09',
      correo: 'profesor@profesor.duoc.cl',
      clave: 'profesor',
      tipo_usuario: 'profesor'
    }
  ];

  //Variable para ver si estoy logueado o no
  isAuthenticated = new BehaviorSubject(false);


  constructor(private router: Router, private storage: StorageServiceService) { }


  //metodos:
  addUsuario(usuario) {
    if (this.getUsuario(usuario.rut) == undefined) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  getUsuario(rut) {
    return this.usuarios.find(usu => usu.rut == rut);
  }

  getUsuarios() {
    return this.usuarios;
  }

  updateUsuario(usuario) {
    let index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }

  deleteUsuario(rut) {
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }

  //METODOS CUSTUMER:
  loginUsuario(correo, clave) {
    
    var usuarioLogin: any;
    usuarioLogin = this.usuarios.find(usu => usu.correo == correo && usu.clave == clave);
    if (usuarioLogin != undefined) {
      //PARA CAMBIAR EL VALOR A UN BehaviorSubject SE UTILIZA EL METODO .next(valor);
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
  }
  getAuth(){
    return this.isAuthenticated.value;
  }
  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  validarCorreo(correo){
    return this.usuarios.find(usu => usu.correo == correo);
  }

  cantidadUsuarios(): number{
    return this.usuarios.length;
  }


}
