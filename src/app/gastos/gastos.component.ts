import { Component, OnInit, EventEmitter } from '@angular/core';
import { ReembolsosService } from '../service/reembolsos.service';
import { Chart } from 'chart.js';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioDTO } from '../dto/usuario-dto';
import { element } from 'protractor';
import { ReembolsoDTO } from '../dto/reembolso-dto';

@Component({
  selector: 'ca-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];
  chart = [];
  gastosTotais: any[];
  usuario: UsuarioDTO;

  meses: any[] = [];
  gastos: any[] = [];
  gastosHospedagem: any[] = [];
  gastosAlimentacao: any[] = [];
  gastosTransporte: any[] = [];
  gastosOutros: any[] = [];
  somaHospedagem = 0;
  somaAlimentacao = 0;
  somaTransporte = 0;
  somaOutros = 0;

  reembolsos: ReembolsoDTO[];

  constructor(
      private reembolsoService: ReembolsosService,
      private usuarioService: UsuarioService
    ) {
    this.sidenavActions = new EventEmitter<any>();
    this.sidenavParams = [{
        closeOnClick: true
    }];
  }

  public showSidenav(): void {
    this.sidenavParams = ['show'];
    this.sidenavActions.emit('sideNav');
  }

  buscarReembolsosEmpresa() {
    this.reembolsoService.buscarReembolsosEmpresa().subscribe((res) => {
        this.carregaDadosGrafico(res);
        this.carregaGastosTotais(res);
    });
  }

  buscarReembolsosUsuario() {
    this.reembolsoService.buscarReembolsosUsuario().subscribe((res) => {
        this.carregaDadosGrafico(res);
    });
  }

  carregaGastosTotais(reembolsos: ReembolsoDTO[]) {
    const map = new Map();
    reembolsos.forEach(x => {
        if (!map.has(x.idUsuario)) {
            map.set(x.idUsuario, x.valor);
        } else {
            map.set(x.idUsuario, +map.get(x.idUsuario) + +x.valor);
        }
    });

    // map.forEach((value: any, key: any) => {
    //     this.usuarioService.
    // });
  }

  carregaDadosGrafico(reembolsos: ReembolsoDTO[]) {
      console.log(reembolsos);
      reembolsos.forEach(a => {
          if (this.meses.indexOf(a.data.substring(3)) === -1) {
              this.meses.push(a.data.substring(3));
          }
          this.gastos.push({ mes: a.data.substring(3), categoria: a.categoria, valor: a.valor });
      });
      this.gastos = this.gastos.sort((n1, n2): any => {
          if (n1.mes.substring(0, 2) > n2.mes.substring(0, 2) || n1.mes.substring(3) > n2.mes.substring(3)) {
              return 1;
          }
      });

      this.meses = this.meses.sort((n1, n2): any => {
          if (n1.substring(0, 2) > n2.substring(0, 2) || n1.substring(3) > n2.substring(3)) {
              return 1;
          }
      });

      this.meses.forEach(y => {
          this.somaHospedagem = 0;
          this.somaAlimentacao = 0;
          this.somaTransporte = 0;
          this.somaOutros = 0;
          this.gastos.forEach(i => {
              if (i.mes === y) {
                  if (i.categoria === 'Hospedagem') {
                      this.somaHospedagem += +i.valor;
                  }
                  if (i.categoria === 'Transporte') {
                      this.somaTransporte += +i.valor;
                  }
                  if (i.categoria === 'Alimentação') {
                      this.somaAlimentacao += +i.valor;
                  }
                  if (i.categoria === 'Outros') {
                      this.somaOutros += +i.valor;
                  }
              }
          });
          this.gastosHospedagem.push(this.somaHospedagem);
          this.gastosAlimentacao.push(this.somaAlimentacao);
          this.gastosTransporte.push(this.somaTransporte);
          this.gastosOutros.push(this.somaOutros);
      });

      this.carregaGrafico();
  }

  carregaGrafico() {
    this.chart = new Chart('canvas', {
        type: 'line',
        data: {
            labels: this.meses,
            datasets: [{
                label: 'Hospedagem',
                data: this.gastosHospedagem,
                backgroundColor: [
                    'rgba(38, 135, 233, 0.2)'
                ],
                borderColor: [
                    'rgba(38, 135, 233,1)'
                ],
                borderWidth: 3,
                fill: false,
                lineTension: 0
            },
            {
                label: 'Transporte',
                data: this.gastosTransporte,
                backgroundColor: [
                    'rgba(255, 0, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 0, 255,1)'
                ],
                borderWidth: 3,
                fill: false,
                lineTension: 0
            },
            {
                label: 'Alimentação',
                data: this.gastosAlimentacao,
                backgroundColor: [
                    'rgba(255, 125, 0, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 125, 0, 1)'
                ],
                borderWidth: 3,
                fill: false,
                lineTension: 0
            },
            {
                label: 'Outros',
                data: this.gastosOutros,
                backgroundColor: [
                    'rgba(0, 255, 0, 0.2)'
                ],
                borderColor: [
                    'rgba(0, 255, 0, 1)'
                ],
                borderWidth: 3,
                fill: false,
                lineTension: 0
            }]

        },
        options: {
            responsive: true,
            scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                    return 'R$ ' + value;
                    }
                }
            }]
            }
        }
    });
  }

  ngOnInit() {
    this.gastosTotais = this.reembolsoService.gastosTotal();
    this.usuario = this.usuarioService.usuario;

    if (this.usuario.isAdmin) {
        this.buscarReembolsosEmpresa();
    } else {
        this.buscarReembolsosUsuario();
    }
  }

}
