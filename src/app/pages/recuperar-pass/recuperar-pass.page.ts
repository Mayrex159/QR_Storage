import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {

  correo: string = '';

  constructor(private router: Router, private storage: StorageServiceService) {
  }

  ngOnInit() {
  }

  async recuperar() {
    if (await this.storage.validarCorreo(this.correo) != undefined) {
      alert('Se ha enviado la nueva contraseña a tú correo!');
      this.correo = '';
      this.router.navigate(['/login']);
    } else {
      alert('Correo Incorrecto');
    }
  }


}
