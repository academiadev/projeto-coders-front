import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CadastroService {
  constructor() {}

  cadastrar(form: any) {
    console.log(form);
  }
}