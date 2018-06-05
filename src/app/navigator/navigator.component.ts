import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import { LoginService } from '../service/login.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'ca-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  @Input() titulo;
  usuario: any;
  empresa: any;
  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];

  constructor(private loginService: LoginService) {
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
    this.usuario = this.loginService.usuario;
    this.empresa = this.loginService.empresa;
  }

}
