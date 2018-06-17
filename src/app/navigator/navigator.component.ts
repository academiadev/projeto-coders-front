import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioDTO } from '../dto/usuario-dto';
import { toast } from 'angular2-materialize';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { EmpresaDTO } from '../dto/empresa-dto';

@Component({
  selector: 'ca-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  @Input() titulo;
  usuario: UsuarioDTO = { 'id': 0, 'nome': '', 'email': '', 'senha': '', 'isAdmin': false, 'empresa': null };
  empresa: EmpresaDTO;
  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];

  constructor(
    private usuarioService: UsuarioService,
    public authService: AuthService,
    private router: Router
  ) {
    this.sidenavActions = new EventEmitter<any>();
    this.sidenavParams = [{
      closeOnClick: true
    }];
  }

  copiaCodigoEmpresa() {
    toast('Código copiado!', 2000, 'rounded');
  }

  public showSidenav(): void {
    this.sidenavParams = ['show'];
    this.sidenavActions.emit('sideNav');
  }

  ngOnInit() {
    if(this.usuarioService.usuario) {
      this.usuario = this.usuarioService.usuario;
      this.empresa = this.usuarioService.usuario.empresa;
    } else {
      this.onLogout();
    }
  }

  onLogout() {
    this.authService.logoutAndRedirect();
  }

}
