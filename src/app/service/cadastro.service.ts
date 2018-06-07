import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CadastroService {
  constructor(private http: HttpClient) {}

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
    return this.http.post('http://localhost:8080/cadastrarUsuario?empresaCodigo=' + cadastro.codigoEmpresa +
    '&empresaNome=' + cadastro.nomeEmpresa, this.modelaCadastro(cadastro));
  }
}
