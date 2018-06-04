import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ca-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.css']
})
export class AvisoComponent implements OnInit {

  @Input() titulo;
  @Input() mensagem;

  constructor() { }

  ngOnInit() {
  }

}
