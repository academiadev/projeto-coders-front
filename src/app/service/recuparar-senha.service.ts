import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RecupararSenhaService {
  constructor() {}

  recuparar(form: any) {
    console.log(form);
  }
}