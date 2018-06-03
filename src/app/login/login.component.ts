import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/inputs.validators';

@Component({
  selector: 'ca-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private loginService: LoginService) { }

  onSubmit(form: any) {
    this.loginService.login(form);
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
