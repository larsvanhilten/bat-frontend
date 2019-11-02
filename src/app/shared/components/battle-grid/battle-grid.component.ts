import { Component, OnInit, Input, HostListener, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

export interface Ship {
  length: number;
  cells: GridCell[];
}

export interface GridCell {
  isSelected: boolean;
  text?: string;
  ship?: Ship;
  x: number;
  y: number;
}

@Component({
  selector: 'app-battle-grid',
  templateUrl: './battle-grid.component.html',
  styleUrls: ['./battle-grid.component.scss']
})
export class BattleGridComponent implements OnInit {
  public ships = [];
  public serializedGrid;

  @Input() public grid = [];
  @Input() public selectLength = 2;

  @Output() public shipPlaced: EventEmitter<Ship> = new EventEmitter();
  @Output() public shipRemoved: EventEmitter<Ship> = new EventEmitter();

  private selectIsHorizontal = true;
  private currentCell;

  constructor() {}

  public ngOnInit(): void {
    this.createGrid(11, 11);
  }

  private createGrid(x, y): void {
    for (let i = 0; i < x; i++) {
      this.grid[i] = [];
      for (let j = 0; j < y; j++) {
        const cell: GridCell = { isSelected: false, x: i, y: j, text: this.decideCellText(i, j) };
        this.grid[i][j] = cell;
      }
    }
  }

  private decideCellText(x, y): string {
    if (x !== 0 && y === 0) {
      return x.toString();
    }

    if (x === 0 && y !== 0) {
      return String.fromCharCode(97 + (y - 1)).toUpperCase();
    }

    if (x === 0 && y === 0) {
      return ' ';
    }

    return null;
  }

  public isCell(cell: GridCell): boolean {
    return !cell.text;
  }

  public onCellClick(cell: GridCell): void {
    if (!cell.ship && this.selectLength !== 0) {
      this.placeShip(cell);
    } else if (cell.ship && this.selectLength === 0) {
      this.removeShip(cell.ship);
    }
  }

  private placeShip(cell: GridCell): void {
    let cells = [];
    if (this.selectIsHorizontal) {
      cells = this.getHorizontalNeighbours(cell);
    } else {
      cells = this.getVerticalNeighbours(cell);
    }

    if (cells && cells.length === this.selectLength && !this.cellsContainShip(cells)) {
      const ship: Ship = { cells, length: this.selectLength };
      cells.map((c) => (c.ship = ship));
      this.ships.push(ship);
      this.shipPlaced.emit(ship);
      this.unselectCells(cell);
    }
  }

  private cellsContainShip(cells: GridCell[]): boolean {
    return !!cells.find((cell) => !!cell.ship);
  }

  private removeShip(ship: Ship): void {
    ship.cells.map((cell) => (cell.ship = null));
    this.shipRemoved.emit(ship);
  }

  public onCellEnter(cell: GridCell): void {
    this.currentCell = cell;
    this.selectCells(cell);
  }

  public onCellLeave(cell: GridCell): void {
    this.currentCell = null;
    this.unselectCells(cell);
  }

  public decideClass(cell: GridCell): string {
    let cellClass = 'cell';
    if (cell && cell.isSelected) {
      cellClass = cellClass.concat(' ', 'hover');
    }

    if (cell && cell.ship) {
      cellClass = cellClass.concat(' ', `size-${cell.ship.length}`);
    }
    return cellClass;
  }

  private selectCells(cell: GridCell): void {
    let cells = [];
    if (this.selectIsHorizontal) {
      cells = this.getHorizontalNeighbours(cell);
    } else {
      cells = this.getVerticalNeighbours(cell);
    }
    cells.map((c) => (c.isSelected = true));
  }

  private unselectCells(cell: GridCell): void {
    let cells = [];
    if (this.selectIsHorizontal) {
      cells = this.getHorizontalNeighbours(cell);
    } else {
      cells = this.getVerticalNeighbours(cell);
    }
    cells.map((c) => (c.isSelected = false));
  }

  @HostListener('document:keypress', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === 'r') {
      this.unselectCells(this.currentCell);
      this.selectIsHorizontal = !this.selectIsHorizontal;
      this.selectCells(this.currentCell);
    }
  }

  private getVerticalNeighbours(cell): GridCell[] {
    if (!cell) {
      return [];
    }

    const { x, y } = cell;
    let xMin = x - this.selectLength + 1;
    if (xMin < 0) {
      xMin = 0;
    }

    let xMax = x + 1;
    if (xMax > this.grid.length) {
      xMax = this.grid.length;
    }

    const cells = [];
    for (let i = xMin; i < xMax; i++) {
      const c: GridCell = this.grid[i][y];
      if (c && !c.text) {
        cells.push(c);
      }
    }
    return cells;
  }

  private getHorizontalNeighbours(cell): GridCell[] {
    if (!cell) {
      return [];
    }

    const { x, y } = cell;
    let yMin = y - this.selectLength + 1;
    if (yMin < 0) {
      yMin = 0;
    }

    let yMax = y + 1;
    if (yMax > this.grid.length) {
      yMax = this.grid[x].length;
    }

    const cells = [];
    for (let i = yMin; i < yMax; i++) {
      const c: GridCell = this.grid[x][i];
      if (c && !c.text) {
        cells.push(c);
      }
    }
    return cells;
  }
}
