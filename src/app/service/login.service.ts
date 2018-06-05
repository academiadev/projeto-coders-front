import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from '../dto/login-dto';
import { TokenDTO } from '../dto/token-dto';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { DataService } from './service/data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  url = 'http://localhost:8080/login';
  usuario: any = { nome: 'Felipe', email: 'felipefuerback@hotmail.com', isAdmin: false };
  empresa: any = { nome: 'Company', codigo: 1515 };

  login(login: LoginDTO) {
    console.log(login);
  }

  loginCerto(login: LoginDTO): Observable<TokenDTO> {
    return this.http.post(this.url, login).pipe(
      map(res => <TokenDTO>res)
    );
  }
}
