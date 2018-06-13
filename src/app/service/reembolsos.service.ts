import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReembolsoDTO } from '../dto/reembolso-dto';
import { UsuarioService } from './usuario.service';
import { environment } from './../../environments/environment';
import { DataService } from './data.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ReembolsosService extends DataService {

  constructor(http: HttpClient,
              private usuarioService: UsuarioService
  ) {
    super(environment.backEndUrl, http);
  }

  reem: ReembolsoDTO[] = [
    {
      id: null,
      descricao: 'Visita',
      status: 'waiting',
      valor: '312,00',
      categoria: 'Outros',
      nomeUsuario: 'Felipe',
      data: '10/10/2008',
      idUsuario: null,
      arquivoPath: null
    },
    {
      id: null,
      descricao: 'Almoço',
      status: 'approved',
      valor: '215,00',
      categoria: 'Alimentação',
      nomeUsuario: 'Willian',
      data: '10/10/2008',
      idUsuario: null,
      arquivoPath: null
    },
    {
      id: null,
      descricao: 'Hotel',
      status: 'canceled',
      valor: '312,00',
      categoria: 'Hospedagem',
      nomeUsuario: 'Kauan',
      data: '10/10/2008',
      idUsuario: null,
      arquivoPath: null
    },
    {
      id: null,
      descricao: 'Uber',
      status: 'canceled',
      valor: '40,00',
      categoria: 'Transporte',
      nomeUsuario: 'Bruno',
      data: '10/10/2008',
      idUsuario: null,
      arquivoPath: null
    }
  ];

  cat: any[] = [
    {
      id: '1',
      nome: 'Hospedagem'
    },
    {
      id: '2',
      nome: 'Alimentação'
    },
    {
      id: '3',
      nome: 'Transporte'
    },
    {
      id: '4',
      nome: 'Outros'
    }
  ];

  gastosTot: any[] = [
    {
      valor: '312,00',
      email: 'fuerback@gmail.com',
      usuario: 'Felipe'
    },
    {
      valor: '215,00',
      email: 'willian@gmail.com',
      usuario: 'Willian'
    },
    {
      valor: '315,00',
      email: 'kauan@gmail.com',
      usuario: 'Kauan'
    },
    {
      valor: '415,00',
      email: 'bruno@gmail.com',
      usuario: 'Bruno'
    }
  ];

  reembolsos(): any[] {
    return this.reem;
  }

  categorias(): any[] {
    return this.cat;
  }

  gastosTotal(): any[] {
    return this.gastosTot;
  }

  setReembolso(form: any): void {
    this.reem.push({
      id: null,
      descricao: form.nome,
      categoria: form.categoria,
      data: form.data,
      status: 'waiting',
      idUsuario: null,
      nomeUsuario: 'Felipe F',
      arquivoPath: '',
      valor: form.valor
    });
  }

  excluirReembolso(form: any) {
    const index = this.reem.indexOf(form, 0);
    if (index > -1) {
      this.reem.splice(index, 1);
    }
  }

  editarReembolso(novoForm: any, antigoForm: any) {
    const index = this.reem.indexOf(antigoForm, 0);
    if (index > -1) {
      novoForm.value.status = 'waiting';
      this.reem[index] = novoForm.value;
    }
  }

  adicionaReembolso(reembolso: ReembolsoDTO, file: any): Observable<any> {
    reembolso.id = null;
    reembolso.idUsuario = this.usuarioService.usuario.id;
    reembolso.status = '';
    console.log(reembolso);
    console.log(file);
    return this.http.post(environment.urls.reembolso.cadastrar, reembolso, this.getHeaders());
  }

  buscarReembolsos(): Observable<any> {
    return this.http.get(environment.urls.reembolso.buscarReembolsosUsuario,
      this.getHeadersParams(this.usuarioService.usuario.id)
    );
  }
}
