import { Component, OnInit, EventEmitter } from '@angular/core';
import { toast } from 'angular2-materialize';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/inputs.validators';
import { AtualizaPerfilService } from '../service/atualiza-perfil.service';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioDTO } from '../dto/usuario-dto';

@Component({
  selector: 'ca-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilForm: FormGroup;
  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];
  usuario: UsuarioDTO;

  constructor(
    private ataualizaPerfilService: AtualizaPerfilService,
    private usuarioService: UsuarioService
  ) {
    this.sidenavActions = new EventEmitter<any>();
    this.sidenavParams = [{
      closeOnClick: true
    }];
  }

  onSubmit(form: any) {
    this.ataualizaPerfilService.atualiza(form).subscribe(res => {
      /* Ao atualizar o email o token se perde e invalida a sessão */
      toast('Perfil atualizado!', 2000, 'rounded');
    });
  }

  public showSidenav(): void {
    this.sidenavParams = ['show'];
    this.sidenavActions.emit('sideNav');
  }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;

    this.perfilForm = new FormGroup({
      email: new FormControl(this.usuario.email, [Validators.required, CustomValidators.emailValidator]),
      nome: new FormControl(this.usuario.nome, [Validators.required, Validators.minLength(3)])
    });
  }

  get email(): any { return this.perfilForm.get('email'); }
  get nome(): any { return this.perfilForm.get('nome'); }

}
