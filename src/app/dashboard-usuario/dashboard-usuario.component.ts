import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ReembolsosService } from '../service/reembolsos.service';

@Component({
  selector: 'ca-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css']
})
export class DashboardUsuarioComponent implements OnInit {

  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];
  modalActions = new EventEmitter<string|MaterializeAction>();

  public datepicker = '';
  public nome: string;

  public numberMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
    allowLeadingZeroes: true,
    allowDecimal: true
  });

  modalParams = [
    {
      dismissible: false
    }
  ];

  categorias: any[];

  reembolsos: any[];

  constructor(private reembolsoService: ReembolsosService) {
    this.sidenavActions = new EventEmitter<any>();
    this.sidenavParams = [{
      closeOnClick: true
    }];
  }

  openModal() {
    this.modalActions.emit( {action: 'modal', params: ['open']});
  }

  closeModal(form: any) {
    this.modalActions.emit({action: 'modal', params: ['close']});
    this.limparModal(form);
  }

  addReembolso(form: any) {
    this.reembolsoService.setReembolso(form);
    this.limparModal(form);
  }

  limparModal(form: any) {
    form.reset();
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
