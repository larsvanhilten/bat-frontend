import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BattleGridComponent } from './components/battle-grid/battle-grid.component';
import { BattleLegendaComponent } from './components/battle-legenda/battle-legenda.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BattleGridComponent, BattleLegendaComponent],
  exports: [BattleGridComponent, BattleLegendaComponent]
})
export class SharedModule {}
