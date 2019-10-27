import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Ship } from 'src/app/shared/components/battle-legenda/battle-legenda.component';
import { GridCell } from 'src/app/shared/components/battle-grid/battle-grid.component';

@Component({
  templateUrl: './lobby-placement.component.html',
  styleUrls: ['./lobby-placement.component.scss']
})
export class LobbyPlacementComponent implements OnInit {
  public selectLength = 0;
  public ships = [
    { length: 6 },
    { length: 4 },
    { length: 4 },
    { length: 3 },
    { length: 3 },
    { length: 3 },
    { length: 2 },
    { length: 2 },
    { length: 2 },
    { length: 2 }
  ];

  constructor(private snackBar: MatSnackBar, private authService: AuthService) {}

  public ngOnInit(): void {}

  public startGame(): void {}

  public shipPlaced(cells: GridCell[]): void {
    this.selectLength = 0;
    const index = this.ships.findIndex((ship) => ship.length === this.selectLength);
    this.ships.splice(index, 1);
  }

  public shipSelected(ship: Ship): void {
    this.selectLength = ship.length;
  }
}
