import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ca-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;

  senhaPatetrn = /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]))([A-Za-z\d@#$%^&£*\-_+=[\]{}|\\:',?/`~"();!]|\.(?!@)){8,16}$/;
  numerPattern = /^[0-9]*$/;

  constructor() { }

  ngOnInit() {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.pattern(this.senhaPatetrn)]),
      confirmaSenha: new FormControl('', [Validators.required, Validators.pattern(this.senhaPatetrn)]),
      tipo: new FormControl('admin'),
      codigoEmpresa: new FormControl('', [Validators.required, Validators.pattern(this.numerPattern)]),
      nomeEmpresa: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get nome(): any { return this.cadastroForm.get('nome'); }
  get email(): any { return this.cadastroForm.get('email'); }
  get senha(): any { return this.cadastroForm.get('senha'); }
  get confirmaSenha(): any { return this.cadastroForm.get('confirmaSenha'); }
  get tipo(): any { return this.cadastroForm.get('tipo'); }
  get codigoEmpresa(): any { return this.cadastroForm.get('codigoEmpresa'); }
  get nomeEmpresa(): any { return this.cadastroForm.get('nomeEmpresa'); }

}
