import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { DataService } from './data.service';
import { ParamValue } from './param-value';

@Injectable()
export class CadastroService extends DataService {

  constructor(http: HttpClient) {
    super(environment.backEndUrl, http);
  }

  cadastro: any = {
    'email': '',
    'id': 0,
    'idEmpresa': 0,
    'isAdmin': false,
    'nome': '',
    'senha': ''
  };

  modelaCadastro(form: any) {
    this.cadastro.email = form.email;
    this.cadastro.isAdmin = form.tipo === 'admin';
    this.cadastro.nome = form.nome;
    this.cadastro.senha = form.senha;
    return this.cadastro;
  }

  cadastrar(form: any) {
    console.log(this.modelaCadastro(form));
  }

  cadastrarUsuario(cadastro: any) {
    const param: ParamValue[] = [
      { key: 'empresaCodigo', value: cadastro.codigoEmpresa },
      { key: 'empresaNome', value: cadastro.nomeEmpresa }
    ];

    return this.http.post(environment.urls.usuario.cadastro, 
      this.modelaCadastro(cadastro),
      this.getHeadersParams(param)
    );
  }
}
