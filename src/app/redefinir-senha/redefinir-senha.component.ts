import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toast } from 'angular2-materialize';
import { CustomValidators } from '../validators/inputs.validators';
import { RedefinirSenhaService } from '../service/redefinir-senha.service';
import { Router } from '@angular/router';
import { TokenDTO } from '../dto/token-dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'ca-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent implements OnInit {

  redefinirForm: FormGroup;

  constructor(private redefinirService : RedefinirSenhaService,
    private router : Router,
    private jwtHelper: JwtHelperService,
    private usuarioService: UsuarioService) { }

  onSubmit(form: any) {
    this.redefinirService.redefinir(form.senha).subscribe((token: TokenDTO) => {
      localStorage.setItem(environment.tokenName, token.accessToken);
      const decodedToken = this.jwtHelper.decodeToken(token.accessToken);

      this.usuarioService.usuario = decodedToken.usuario;
      toast('Senha atualizada!', 2000, 'rounded');
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.redefinirForm = new FormGroup({
      senha: new FormControl('', [Validators.required, CustomValidators.senhaValidator]),
      senhaRepetida: new FormControl('', [Validators.required, CustomValidators.senhaValidator])
    }, CustomValidators.Match('senha', 'senhaRepetida'));
  }

  get senhaRepetida(): any { return this.redefinirForm.get('senhaRepetida'); }
  get senha(): any { return this.redefinirForm.get('senha'); }

}
