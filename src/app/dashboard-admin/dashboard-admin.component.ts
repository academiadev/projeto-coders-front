import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { ReembolsosService } from '../service/reembolsos.service';
import { toast } from 'angular2-materialize';
import { ReembolsoDTO } from '../dto/reembolso-dto';

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

  reembolsos: ReembolsoDTO[];

  usuario: string;
  valor: string;
  data: string;
  descricao: string;
  categoria: string;
  arquivoPath: string;

  reembolsoSelecionado: ReembolsoDTO;

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
    this.arquivoPath = reembo.arquivoPath;
    this.modalActions.emit( {action: 'modal', params: ['open']});
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  setStatusReembolso(status: string) {
    this.reembolsoService.alterarStatusReembolso(
      this.reembolsoSelecionado.id.toString(),
      status
    ).subscribe((res) => {
      this.buscaReembolsos();
    });
  }

  buscaReembolsos() {
    this.reembolsoService.buscarReembolsosEmpresa().subscribe((res) => {
      this.reembolsos = <ReembolsoDTO[]>res;
      this.reembolsos = this.reembolsos.sort((one, two) => (one.status > two.status ? -1 : 1));
      this.reembolsoService.reem = this.reembolsos;
    });
  }

  downloadFile() {
    const arrayPath = this.arquivoPath.split('\\');
    const fileName = arrayPath[arrayPath.length - 1];
    console.log(fileName);
    this.reembolsoService.downloadArquivo(fileName).subscribe(res => {
      console.log(res);
    });
  }

  copiaCodigoEmpresa() {
    toast('Código copiado!', 2000, 'rounded');
  }

  public showSidenav(): void {
    this.sidenavParams = ['show'];
    this.sidenavActions.emit('sideNav');
  }

  ngOnInit() {
    this.buscaReembolsos();
    this.categorias = this.reembolsoService.categorias();
  }

}
