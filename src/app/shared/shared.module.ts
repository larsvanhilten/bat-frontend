import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BattleGridComponent } from './components/battle-grid/battle-grid.component';
import { ShipLegendaComponent } from './components/ship-legenda/ship-legenda.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BattleGridComponent, ShipLegendaComponent],
  exports: [BattleGridComponent, ShipLegendaComponent]
})
export class SharedModule {}
