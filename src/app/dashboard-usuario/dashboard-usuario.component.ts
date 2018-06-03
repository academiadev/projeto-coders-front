import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ReembolsosService } from '../service/reembolsos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ca-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css']
})
export class DashboardUsuarioComponent implements OnInit {

  dashBoardUserForm: FormGroup;
  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];
  modalActions = new EventEmitter<string|MaterializeAction>();

  public datepicker = '';

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

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
    this.limparModal(this.dashBoardUserForm);
  }

  limparModal(form: any) {
    form.reset();
  }

  public showSidenav(): void {
    this.sidenavParams = ['show'];
    this.sidenavActions.emit('sideNav');
  }

  adicionaReembolso() {
    this.reembolsoService.adicionaReembolso(this.dashBoardUserForm.value);
    this.reembolsoService.setReembolso(this.dashBoardUserForm.value);
    this.limparModal(this.dashBoardUserForm);
  }

  ngOnInit() {
    this.reembolsos = this.reembolsoService.reembolsos();
    this.categorias = this.reembolsoService.categorias();

    this.dashBoardUserForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      categoria: new FormControl('', [Validators.required]),
      data : new FormControl('', [Validators.required]),
      valor : new FormControl('', [Validators.required])
    });
  }

  get nome(): any { return this.dashBoardUserForm.get('nome'); }
  get categoria(): any { return this.dashBoardUserForm.get('categoria'); }
  get data(): any { return this.dashBoardUserForm.get('data'); }
  get valor(): any { return this.dashBoardUserForm.get('valor'); }

}
