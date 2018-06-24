import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/inputs.validators';
import { LoginDTO } from '../dto/login-dto';
import { AuthService } from './../service/auth.service';
import { TokenDTO } from '../dto/token-dto';
import { environment } from './../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { BadCredentialsError } from './../commons/bad-credentials';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioDTO } from '../dto/usuario-dto';

@Component({
  selector: 'ca-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  autenticacaoValida: Boolean = true;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private jwtHelper: JwtHelperService,
              private usuarioService: UsuarioService
  ) { }

  onSubmit(login: LoginDTO) {
    this.authService.login(login).subscribe((token: TokenDTO) => {
      localStorage.setItem(environment.tokenName, token.accessToken);
      const decodedToken = this.jwtHelper.decodeToken(token.accessToken);

      this.usuarioService.usuario = decodedToken.usuario;

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl || '/dashboardAdmin']);
    },
      (e) => {
        if (e instanceof BadCredentialsError) {
          this.autenticacaoValida = false;
        } else {
          throw e;
        }
      });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, CustomValidators.emailValidator]),
      senha: new FormControl('', [Validators.required, CustomValidators.senhaValidator])
    });
  }

  get email(): any { return this.loginForm.get('email'); }
  get senha(): any { return this.loginForm.get('senha'); }

}
