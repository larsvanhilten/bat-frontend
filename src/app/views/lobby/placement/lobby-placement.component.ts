import { Component, OnInit } from '@angular/core';
import { Ship, GridCell } from 'src/app/shared/components/battle-grid/battle-grid.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './lobby-placement.component.html',
  styleUrls: ['./lobby-placement.component.scss']
})
export class LobbyPlacementComponent implements OnInit {
  public selectLength = 0;
  public ships = [6, 4, 4, 3, 3, 3, 2, 2, 2, 2];
  public grid = [];

  constructor(private snackBar: MatSnackBar) {}

  public ngOnInit(): void {}

  public startGame(): void {
    if (this.ships.length !== 0) {
      this.snackBar.open('Please place all your ships');
      return;
    }

    const serializedGrid = this.serializeGrid();
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

  private serializeGrid(): number[][] {
    // Remove first and last row (number/alphabet cells)
    const grid = this.grid.map((row) => row.filter((cell, index) => index !== 0));
    grid.splice(0, 1);

    return grid.map((row) => {
      return row.map((cell: GridCell, index: number) => {
        if (!cell.ship) {
          return 0;
        }
        return cell.ship.length;
      });
    });
  }
}
