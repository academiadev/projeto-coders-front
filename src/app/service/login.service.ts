import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  constructor() {}

  usuario: any = { nome: 'Felipe', email: 'felipefuerback@hotmail.com', isAdmin: true };
  empresa: any = { nome: 'Company', codigo: 1515 };

  login(form: any) {
    console.log(form);
  }
}
