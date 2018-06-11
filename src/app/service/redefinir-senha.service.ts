import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RedefinirSenhaService {
  constructor() {}

  redefinir(form: any) {
    console.log(form);
  }
}
