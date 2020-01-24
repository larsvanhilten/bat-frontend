import { Component, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ship-legenda',
  templateUrl: './ship-legenda.component.html',
  styleUrls: ['./ship-legenda.component.scss']
})
export class ShipLegendaComponent {
  @Input() public ships: number[];
  @Output() public shipSelected: EventEmitter<number> = new EventEmitter();

  public onShipClick(shipLength: number): void {
    this.shipSelected.emit(shipLength);
  }
}
