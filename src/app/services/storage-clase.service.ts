import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';



@Injectable({
  providedIn: 'root'
})
export class StorageClaseService {


  //variable necesarias:
  datos: any[] = [];
  dato: any;


  constructor(private storage: Storage) {
    storage.create();
  }

  //métodos del crud del storage:
  async agregar(key, dato) {
    this.datos = await this.storage.get(key) || [];

    this.dato = await this.obtenerDato(key, dato.idClase);
    if (this.dato == undefined) {
      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;
    }
    return false;
  }

  async obtenerDato(key, identificador) {
    this.datos = await this.storage.get(key) || [];

    this.dato = this.datos.find(clase => clase.id == identificador);
    return this.dato;
  }

  async obtenerDatos(key): Promise<any[]> {
    this.datos = await this.storage.get(key);
    return this.datos;
  }


  async eliminar(key, dato) {
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if (value.id == dato) {
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
  }

  async actualizar(key, dato) {
    this.datos = await this.storage.get(key) || [];

    var index = this.datos.findIndex(clase => clase.id == dato.id);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }

//OBTENER LA CANTIDAD DE USUARIOS EN EL STORAGE DE CLASES:
async cantidadClases(){
  let numero = await this.storage.get('clase') || [];
  return numero.length;
}

async generarId(key) {
  this.datos = await this.storage.get(key) || [];
  let id = 0;
  for (let x of this.datos) {
    id = x.id;
  }
  return id + 1;
}

}
