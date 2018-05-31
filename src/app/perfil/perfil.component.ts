import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'ca-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];

  constructor() {
    this.sidenavActions = new EventEmitter<any>();
    this.sidenavParams = [{
      closeOnClick: true
    }];
  }

  public showSidenav(): void {
    this.sidenavParams = ['show'];
    this.sidenavActions.emit('sideNav');
  }

  public atualizar(): void {
    toast('Perfil atualizado!', 2000, 'rounded');
  }

  ngOnInit() {
  }

}
