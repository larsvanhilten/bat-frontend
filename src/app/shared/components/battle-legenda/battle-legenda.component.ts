import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-battle-legenda',
  templateUrl: './battle-legenda.component.html',
  styleUrls: ['./battle-legenda.component.scss']
})
export class BattleLegendaComponent implements OnInit {
  @Input() public ships: number[];
  @Output() public shipSelected: EventEmitter<number> = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {}

  public onShipClick(shipLength: number): void {
    this.shipSelected.emit(shipLength);
  }
}
