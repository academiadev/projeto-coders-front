import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { environment } from './../../environments/environment';
import { ParamValue } from './param-value';

@Injectable()
export class RedefinirSenhaService extends DataService {

  constructor(http: HttpClient, private usuarioService: UsuarioService) {
    super(environment.backEndUrl, http);
  }

  /**
   *
   * @url http://localhost:8080/trocar-senha
   */
  redefinir(senha: string): Observable<any> {
    console.log(senha);

    const param: ParamValue[] = [
      { key: 'newPassword', value: senha }
    ];
    
    return this.http.post(environment.urls.usuario.trocaSenha, {}, this.getHeadersParams(param));
  }
}
