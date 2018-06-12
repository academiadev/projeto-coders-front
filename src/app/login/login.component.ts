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
              private jwtHelper: JwtHelperService
  ) { }

  onSubmit(login: LoginDTO) {
    this.authService.login(login).subscribe((token: TokenDTO) => {
      localStorage.setItem(environment.tokenName, token.accessToken);
      console.log(token.accessToken);
      const decodedToken = this.jwtHelper.decodeToken(token.accessToken);
      console.log(decodedToken);

      /* Onde é possível retornar uma url válida pelo queryParamMap? */
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl || '/dashboardAdmin']);

      /* Necessário o refreh aqui? onde é necessário? */
      this.authService.refresh().subscribe(e => { });
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
