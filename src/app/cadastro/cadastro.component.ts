import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../service/cadastro.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/inputs.validators';

@Component({
  selector: 'ca-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;

  constructor(private cadastroService: CadastroService) { }

  onSubmit(form: any) {
    this.cadastroService.cadastrarUsuario(form).subscribe(res => console.log(res));
  }

  ngOnInit() {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, CustomValidators.emailValidator]),
      senha: new FormControl('', [Validators.required, CustomValidators.senhaValidator]),
      confirmaSenha: new FormControl('', [Validators.required, CustomValidators.senhaValidator]),
      tipo: new FormControl('admin'),
      codigoEmpresa: new FormControl('', [Validators.required, CustomValidators.numeroValidator]),
      nomeEmpresa: new FormControl('', [Validators.required, Validators.minLength(3)])
    }, CustomValidators.Match('senha', 'confirmaSenha') );
  }

  get nome(): any { return this.cadastroForm.get('nome'); }
  get email(): any { return this.cadastroForm.get('email'); }
  get senha(): any { return this.cadastroForm.get('senha'); }
  get confirmaSenha(): any { return this.cadastroForm.get('confirmaSenha'); }
  get tipo(): any { return this.cadastroForm.get('tipo'); }
  get codigoEmpresa(): any { return this.cadastroForm.get('codigoEmpresa'); }
  get nomeEmpresa(): any { return this.cadastroForm.get('nomeEmpresa'); }

}
