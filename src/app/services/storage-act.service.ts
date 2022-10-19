import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageActService {

  //variable necesarias:
  datos: any[] = [];
  dato: any;

  constructor(private storage: Storage, private router: Router) {
    storage.create();
  }



  //métodos del crud del storage:
  async agregar(key, dato) {
    this.datos = await this.storage.get(key) || [];

    this.dato = await this.obtenerDato(key, dato.correo, dato.clave);
    if (this.dato == undefined) {
      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;
    }
    return false;
  }

  async obtenerDato(key, correo, clave ) {
    this.datos = await this.storage.get(key) || [];

    this.dato = this.datos.find(usu => usu.correo == correo && usu.clave == clave);    
    return this.dato;
  }

  async obtenerDatos(key): Promise<any[]> {
    this.datos = await this.storage.get(key);
    return this.datos;
  }





}
