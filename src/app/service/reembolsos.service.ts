import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ReembolsoDTO } from '../dto/reembolso-dto';
import { UsuarioService } from './usuario.service';
import { environment } from './../../environments/environment';
import { DataService } from './data.service';
import { Observable } from 'rxjs/internal/Observable';
import { ParamValue } from './param-value';

@Injectable()
export class ReembolsosService extends DataService {

  constructor(http: HttpClient,
    private usuarioService: UsuarioService
  ) {
    super(environment.backEndUrl, http);
  }

  reem: ReembolsoDTO[];

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

  excluirReembolso(form: ReembolsoDTO): Observable<any> {
    const index = this.reem.indexOf(form, 0);
    if (index > -1) {
      const param: ParamValue[] = [
        { key: 'reembolsoId', value: form.id }
      ];

      return this.http.post(environment.urls.reembolso.excluir, {},
        this.getHeadersParams(param));
    }
  }

  editarReembolso(novoForm: any, antigoForm: any): Observable<any> {
    const index = this.reem.indexOf(antigoForm, 0);
    if (index > -1) {
      novoForm.value.status = 'waiting';
      this.reem[index] = novoForm.value;
      novoForm.value.id = antigoForm.id;
      novoForm.value.idUsuario = antigoForm.idUsuario;
      if (!novoForm.value.arquivoPath) {
        novoForm.value.arquivoPath = antigoForm.arquivoPath;
      }
      novoForm.value.nomeUsuario = antigoForm.nomeUsuario;
      return this.http.post(environment.urls.reembolso.editar, novoForm.value, this.getHeaders());
    }
  }

  adicionaReembolso(reembolso: ReembolsoDTO): Observable<any> {
    reembolso.id = null;
    reembolso.idUsuario = this.usuarioService.usuario.id;
    reembolso.status = '';
    return this.http.post(environment.urls.reembolso.cadastrar, reembolso, this.getHeaders());
  }

  adicionarArquivo(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(environment.urls.reembolso.salvarArquivo, formData, this.getHeaders());
  }

  downloadArquivo(fileName: any): Observable<any> {
    const params = new HttpParams();
    params.set('fileName', fileName);
    return this.http.get(environment.urls.reembolso.downloadArquivo, { headers: new HttpHeaders(), params: params, responseType: 'blob' });
  }

  buscarReembolsosUsuario(): Observable<any> {
    const param: ParamValue[] = [
      { key: 'usuarioId', value: this.usuarioService.usuario.id }
    ];

    return this.http.get(environment.urls.reembolso.buscarReembolsosUsuario,
      this.getHeadersParams(param)
    );
  }

  alterarStatusReembolso(reembolsoId: string, status: string): Observable<any> {
    const param: ParamValue[] = [
      { key: 'reembolsoId', value: reembolsoId },
      { key: 'status', value: status }
    ];

    return this.http.post(environment.urls.reembolso.alteraStatusReembolso, {},
      this.getHeadersParams(param)
    );
  }

  buscarReembolsosEmpresa(): Observable<any> {
    const param: ParamValue[] = [
      { key: 'empresaId', value: this.usuarioService.usuario.empresa.id }
    ];

    return this.http.get(environment.urls.reembolso.buscarReembolsosEmpresa,
      this.getHeadersParams(param)
    );
  }
}
