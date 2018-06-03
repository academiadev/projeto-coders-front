import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import { toast } from 'angular2-materialize';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/inputs.validators';
import { AtualizaPerfilService } from '../service/atualiza-perfil.service';

@Component({
  selector: 'ca-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilForm: FormGroup;
  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];

  constructor(private ataualizaPerfilService : AtualizaPerfilService) {
    this.sidenavActions = new EventEmitter<any>();
    this.sidenavParams = [{
      closeOnClick: true
    }];
  }

  onSubmit(form: any) {
    this.ataualizaPerfilService.atualiza(form);
    toast('Perfil atualizado!', 2000, 'rounded');
  }

  public showSidenav(): void {
    this.sidenavParams = ['show'];
    this.sidenavActions.emit('sideNav');
  }

  ngOnInit() {
    this.perfilForm = new FormGroup({
      email: new FormControl('', [Validators.required, CustomValidators.emailValidator]),
      nome: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get email(): any { return this.perfilForm.get('email'); }
  get nome(): any { return this.perfilForm.get('nome'); }

}
