import { Component, OnInit, EventEmitter } from '@angular/core';
import { ReembolsosService } from '../service/reembolsos.service';
import { Chart } from 'chart.js';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioDTO } from '../dto/usuario-dto';

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

  ngOnInit() {
    this.gastosTotais = this.reembolsoService.gastosTotal();
    this.usuario = this.usuarioService.usuario;

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Mai/18', 'Jun/18', 'Jul/18', 'Ago/18', 'Set/18', 'Out/18', 'Nov/18', 'Dez/18', 'Jan/19'],
        datasets: [{
            label: 'Hospedagem',
            data: [126, 191, 152, 260, 390],
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
            data: [156, 185, 120, 160, 157],
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
            data: [132, 122.36, 269, 410, 201],
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
            data: [169, 258, 360, 198, 340],
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

}
