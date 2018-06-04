import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ReembolsosService {

  constructor(private http: HttpClient) {}

  reem: any[] = [
    {
      descricao: 'Visita',
      status: 'waiting',
      valor: '312,00',
      categoria: 'Outros',
      usuario: 'Felipe',
      data: '10/10/2008'
    },
    {
      descricao: 'Almoço',
      status: 'approved',
      valor: '215,00',
      categoria: 'Alimentação',
      usuario: 'Willian',
      data: '10/10/2008'
    },
    {
      descricao: 'Hotel',
      status: 'canceled',
      valor: '312,00',
      categoria: 'Hospedagem',
      usuario: 'Kauan',
      data: '10/10/2008'
    },
    {
      descricao: 'Uber',
      status: 'canceled',
      valor: '40,00',
      categoria: 'Transporte',
      usuario: 'Bruno',
      data: '10/10/2008'
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
      descricao: form.nome,
      status: 'waiting',
      valor: form.valor,
      categoria: form.categoria,
      usuario: 'Felipe F',
      data: form.data
    });
  }

  adicionaReembolso(form: any, file: any) {
    console.log(form);
    console.log(file);
  }

  buscarReembolsos() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((obs) => {
      console.log(obs);
    });
  }
}
