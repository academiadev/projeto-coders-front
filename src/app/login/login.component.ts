import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ca-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  senhaPatetrn = /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]))([A-Za-z\d@#$%^&£*\-_+=[\]{}|\\:',?/`~"();!]|\.(?!@)){8,16}$/;

  constructor(private loginService: LoginService) { }

  login(form: any) {
    this.loginService.login(form);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.pattern(this.senhaPatetrn)])
    });
  }

  get email(): any { return this.loginForm.get('email'); }
  get senha(): any { return this.loginForm.get('senha'); }

}
