import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/inputs.validators';
import { LoginDTO } from '../dto/login-dto';
import { AuthService } from './../service/auth.service';
import { TokenDTO } from '../dto/token-dto';
import { environment } from './../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { BadCredentialsError } from './../commons/bad-credentials';

@Component({
  selector: 'ca-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
  ) { }

  onSubmit(login: LoginDTO) {
    this.authService.login(login).subscribe((token: TokenDTO) => {
      localStorage.setItem(environment.tokenName, token.access_token);

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl || '/login']);

      this.authService.refresh().subscribe(e => {
        console.log(e);
      });

    },
      (e) => {
        console.log('erro -> ' + e);
        if (e instanceof BadCredentialsError) {
          this.senha.setErrors({ 'invalido': true });
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
