import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AtualizaPerfilService {
  constructor() {}

  atualiza(form: any) {
    console.log(form);
  }
}