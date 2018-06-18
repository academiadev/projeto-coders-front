import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDTO } from '../dto/usuario-dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { DataService } from './data.service';
import { ParamValue } from './param-value';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends DataService {

  constructor(
    http: HttpClient
  ) {
      super(environment.backEndUrl, http);
  }

  usuario: UsuarioDTO;

  /**
   *
   * @url http://localhost:8080/whoami
   */
  whoami(): Observable<UsuarioDTO> {
    return this.http.get(environment.urls.usuario.whoami, this.getHeaders()).pipe(
      map(res => this.usuario = <UsuarioDTO>res)
    );
  }

  pesquisaUsuario(usuarioId: string): Observable<any> {
    const param: ParamValue[] = [
      { key: 'usuarioId', value: usuarioId }
    ];

    return this.http.get(
      environment.urls.usuario.pesquisaUsuario,
      this.getHeadersParams(param)
    );
  }
}
