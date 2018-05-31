import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';

@Component({
  selector: 'ca-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];

  constructor() {
    this.sidenavActions = new EventEmitter<any>();
    this.sidenavParams = [];
  }

  public showSidenav(): void {
    this.sidenavParams = ['show'];
    this.sidenavActions.emit('sideNav');
  }

  ngOnInit() { }

}
