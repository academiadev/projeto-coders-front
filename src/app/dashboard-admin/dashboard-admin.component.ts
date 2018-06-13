import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { ReembolsosService } from '../service/reembolsos.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'ca-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];
  modalActions = new EventEmitter<string|MaterializeAction>();

  modalParams = [
    {
      dismissible: false
    }
  ];

  categorias: any[];

  reembolsos: any[];

  usuario: string;
  valor: string;
  data: string;
  descricao: string;
  categoria: string;
  reembolsoSelecionado: any;

  constructor(private reembolsoService: ReembolsosService) {
    this.sidenavActions = new EventEmitter<any>();
    this.sidenavParams = [{
      closeOnClick: true
    }];
  }

  openModal(reembo: any) {
    this.reembolsoSelecionado = reembo;
    this.usuario = reembo.nomeUsuario;
    this.valor = reembo.valor;
    this.data = reembo.data;
    this.descricao = reembo.descricao;
    this.categoria = reembo.categoria;
    this.modalActions.emit( {action: 'modal', params: ['open']});
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  setStatusReembolso(status: string) {
    this.reembolsoSelecionado.status = status;
  }

  copiaCodigoEmpresa() {
    toast('Código copiado!', 2000, 'rounded');
  }

  public showSidenav(): void {
    this.sidenavParams = ['show'];
    this.sidenavActions.emit('sideNav');
  }

  ngOnInit() {
    this.reembolsos = this.reembolsoService.reembolsos();
    this.categorias = this.reembolsoService.categorias();
  }

}
