import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {


  //variable necesarias:
  datos: any[] = [];
  dato: any;

   //Variable para ver si estoy logueado o no
   isAuthenticated = new BehaviorSubject(false);


  constructor(private storage: Storage, private router: Router) {
    storage.create();
  }

  //métodos del crud del storage:
  async agregar(key, dato) {
    this.datos = await this.storage.get(key) || [];

    this.dato = await this.obtenerDato(key, dato.rut);
    if (this.dato == undefined) {
      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;
    }
    return false;
  }

  async obtenerDato(key, identificador) {
    this.datos = await this.storage.get(key) || [];

    this.dato = this.datos.find(persona => persona.rut == identificador);
    return this.dato;
  }

  async obtenerDatos(key): Promise<any[]> {
    this.datos = await this.storage.get(key);
    return this.datos;
  }


  async eliminar(key, dato) {
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if (value.rut == dato) {
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
  }

  async actualizar(key, dato) {
    this.datos = await this.storage.get(key) || [];

    var index = this.datos.findIndex(persona => persona.rut == dato.rut);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }

  //OBTENER LA CANTIDAD DE USUARIOS EN EL STORAGE DE PERSONA:
  async cantidadPersonas(){
    let numero = await this.storage.get('personas') || [];
    return numero.length;
  }

  //METODO DE LOGIN

  async loginUsuario(correo, clave) {
    this.datos = await this.storage.get('personas') || [];
    var usuarioLogin: any;
    usuarioLogin = this.datos.find(usu => usu.correo == correo && usu.clave == clave);
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

  async validarCorreo(correo){
    this.datos = await this.storage.get('personas') || [];
    var correos: any;
    correos = this.datos.find(usu => usu.correo = correo);
    console.log(correos, this.datos);
    return correos;
  }

}
