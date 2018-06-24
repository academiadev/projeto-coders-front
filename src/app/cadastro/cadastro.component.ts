import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../service/cadastro.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/inputs.validators';
import { TokenDTO } from '../dto/token-dto';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'ca-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  login: any;
  emailCadastrado: Boolean = false;
  empresaInexistente: Boolean = false;
  empresaCadastrada: Boolean = false;
  usuarioCadastrado: Boolean = false;

  constructor(private cadastroService: CadastroService,
              private router: Router,
              private jwtHelper: JwtHelperService,
              private usuarioService: UsuarioService) { }

  onSubmit(form: any) {
    this.resetaVerificacoes();
    this.cadastroService.cadastrarUsuario(form).subscribe((token: TokenDTO) => {
      localStorage.setItem(environment.tokenName, token.accessToken);
      const decodedToken = this.jwtHelper.decodeToken(token.accessToken);

      this.usuarioService.usuario = decodedToken.usuario;

      this.router.navigate(['/']);
    },
    (e) => {
      console.log(e.error.exception);
      if (e.error.exception.indexOf('UsuarioExistenteException') >= 0) {
        console.log('UsuarioExistenteException');
        this.usuarioCadastrado = true;
      }
      if (e.error.exception.indexOf('EmpresaExistenteException') >= 0) {
        console.log('EmpresaExistenteException');
        this.empresaCadastrada = true;
      }
      if (e.error.exception.indexOf('EmpresaNaoEncontradaException') >= 0) {
        console.log('EmpresaNaoEncontradaException');
        this.empresaInexistente = true;
      }
      if (e.error.exception.indexOf('EmailJaCadastradoException') >= 0) {
        console.log('EmailJaCadastradoException');
        this.emailCadastrado = true;
      }
    });
  }

  resetaVerificacoes() {
    this.usuarioCadastrado = false;
    this.empresaCadastrada = false;
    this.emailCadastrado = false;
    this.empresaInexistente = false;
  }

  userSelected() {
    this.cadastroForm.patchValue({
      nomeEmpresa: ''
    });
  }

  adminSelected() {
    this.cadastroForm.patchValue({
      codigoEmpresa: ''
    });
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
