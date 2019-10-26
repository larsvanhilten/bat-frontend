import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BattleGridComponent } from './components/battle-grid/battle-grid.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BattleGridComponent],
  exports: [BattleGridComponent]
})
export class SharedModule {}
