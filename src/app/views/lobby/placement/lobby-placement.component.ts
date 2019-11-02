import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Ship, GridCell } from 'src/app/shared/components/battle-grid/battle-grid.component';

@Component({
  templateUrl: './lobby-placement.component.html',
  styleUrls: ['./lobby-placement.component.scss']
})
export class LobbyPlacementComponent implements OnInit {
  public selectLength = 0;
  public ships = [6, 4, 4, 3, 3, 3, 2, 2, 2, 2];
  public grid = [];

  constructor(private snackBar: MatSnackBar, private authService: AuthService) {}

  public ngOnInit(): void {}

  public startGame(): void {
    const serializedGrid = this.serializeGrid();
    console.log(serializedGrid);
  }

  public shipPlaced(placedShip: Ship): void {
    const index = this.ships.findIndex((shipLength) => shipLength === placedShip.length);
    this.ships.splice(index, 1);
    this.selectLength = 0;
  }

  public shipRemoved(removedShip: Ship): void {
    this.ships.push(removedShip.length);
    this.ships.sort((a, b) => b - a);
  }

  public shipSelected(shipLength: number): void {
    this.selectLength = shipLength;
  }

  private serializeGrid(): void {
    const grid = Object.create(this.grid);

    // Remove first and last row (number/alphabet cells)
    grid.splice(0, 1);
    grid.splice(grid.length - 1, 1);

    return grid.map((row) => {
      return row.map((cell: GridCell) => {
        if (!cell.ship) {
          return 0;
        }
        return cell.ship.length;
      });
    });
  }
}
