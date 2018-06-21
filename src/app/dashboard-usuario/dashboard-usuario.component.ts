import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ReembolsosService } from '../service/reembolsos.service';
import { toast } from 'angular2-materialize';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReembolsoDTO } from '../dto/reembolso-dto';

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
  modalActionsEdit = new EventEmitter<string|MaterializeAction>();

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

  reembolsos: ReembolsoDTO[];

  fileSelected: File;

  reembolsoSelecionado: any;

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

  openModalEdit(reembo: any) {
    console.log('OPENMODALEDIT');
    console.log(reembo);
    if (reembo.status === 'waiting') {
      this.reembolsoSelecionado = reembo;
      const arrayPath = reembo.arquivoPath.split('\\');
      this.dashBoardUserForm.setValue({
        descricao: reembo.descricao,
        categoria: reembo.categoria,
        data: reembo.data,
        valor: reembo.valor.replace('.', ','),
        arquivoPath: arrayPath[arrayPath.length - 1]
      });
      this.modalActionsEdit.emit( {action: 'modal', params: ['open']});
    }
  }

  closeModalEdit() {
    this.modalActionsEdit.emit({action: 'modal', params: ['close']});
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
    this.reembolsoService.adicionarArquivo(this.fileSelected).subscribe(res => {
      console.log(res.path);
      this.dashBoardUserForm.patchValue({
        arquivoPath: res.path
      });
      console.log(this.dashBoardUserForm.value);
      this.reembolsoService.adicionaReembolso(this.dashBoardUserForm.value).subscribe(resp => {
        this.buscarReembolsos();
      });
      this.limparModal(this.dashBoardUserForm);
    });
  }

  excluirReembolso() {
    if (confirm('Você deseja excluir o item: ' + this.reembolsoSelecionado.descricao + '?')) {
      this.reembolsoService.excluirReembolso(this.reembolsoSelecionado).subscribe((res) => {
        this.buscarReembolsos();
        toast('Reembolso ' + this.reembolsoSelecionado.descricao + 'excluído!', 2000, 'rounded');
      });
    }
  }

  editarReembolso() {
    if (this.fileSelected) {
      console.log(this.fileSelected);
      this.reembolsoService.adicionarArquivo(this.fileSelected).subscribe(res => {
        this.dashBoardUserForm.patchValue({
          arquivoPath: res.path
        });
        this.reembolsoService.editarReembolso(
          this.dashBoardUserForm,
          this.reembolsoSelecionado
        ).subscribe((resp) => {
          toast('Reembolso editado!', 2000, 'rounded');
        });
      });
    } else {
      this.reembolsoService.editarReembolso(
        this.dashBoardUserForm,
        this.reembolsoSelecionado
      ).subscribe((res) => {
        toast('Reembolso editado!', 2000, 'rounded');
      });
    }
  }

  onFileSelected(event) {
    this.fileSelected = event.target.files[0];
  }

  buscarReembolsos() {
    this.reembolsoService.buscarReembolsosUsuario().subscribe((res) => {
      this.reembolsos = <ReembolsoDTO[]>res;
      this.reembolsos = this.reembolsos.sort((one, two) => (one.status > two.status ? -1 : 1));
      this.reembolsoService.reem = this.reembolsos;
    });
  }

  ngOnInit() {
    this.buscarReembolsos();

    this.categorias = this.reembolsoService.categorias();

    this.dashBoardUserForm = new FormGroup({
      descricao: new FormControl('', [Validators.required, Validators.minLength(3)]),
      categoria: new FormControl('', [Validators.required]),
      data : new FormControl('', [Validators.required]),
      valor : new FormControl('', [Validators.required]),
      arquivoPath : new FormControl('')
    });
  }

  get descricao(): any { return this.dashBoardUserForm.get('descricao'); }
  get categoria(): any { return this.dashBoardUserForm.get('categoria'); }
  get data(): any { return this.dashBoardUserForm.get('data'); }
  get valor(): any { return this.dashBoardUserForm.get('valor'); }
  get arquivoPath(): any { return this.dashBoardUserForm.get('arquivoPath'); }

}
