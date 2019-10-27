import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

export interface Ship {
  length: number;
}

@Component({
  selector: 'app-battle-legenda',
  templateUrl: './battle-legenda.component.html',
  styleUrls: ['./battle-legenda.component.scss']
})
export class BattleLegendaComponent implements OnInit {
  @Input() public ships: Ship[];
  @Output() public shipSelected: EventEmitter<Ship> = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {}

  public onShipClick(ship: Ship): void {
    this.shipSelected.emit(ship);
  }
}
