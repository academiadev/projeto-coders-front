import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { DataService } from './data.service';
import { UsuarioDTO } from '../dto/usuario-dto';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AtualizaPerfilService extends DataService {

  constructor(http: HttpClient, private usuarioService: UsuarioService) {
    super(environment.backEndUrl, http);
  }

  /**
   *
   * @url http://localhost:8080/editarUsuario
   */
  atualiza(usuarioEditado: UsuarioDTO): Observable<any> {
    console.log(usuarioEditado);
    usuarioEditado.id = this.usuarioService.usuario.id;
    console.log(this.usuarioService.usuario);
    return this.http.post(environment.urls.usuario.editar, usuarioEditado, this.getHeaders());
  }
}
