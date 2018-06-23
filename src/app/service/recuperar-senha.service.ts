import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { EsqueceuSenhaDTO } from '../dto/esqueceu-senha-dto'

@Injectable()
export class RecuperarSenhaService extends DataService {
  constructor(http: HttpClient) {
    super(environment.backEndUrl, http);
  }

  /**
   *
   * @url http://localhost:8080/forgotPasswordForm
   */
  recuperar(form: EsqueceuSenhaDTO): Observable<any> {
    console.log(form);
    console.log('OI');
    return this.http.post(environment.urls.auth.recuperarSenha, form, this.getHeaders());
  }
}
