import { Component, OnInit, Input, HostListener, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

export interface GridCell {
  isSelected: boolean;
  text?: string;
  value?: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-battle-grid',
  templateUrl: './battle-grid.component.html',
  styleUrls: ['./battle-grid.component.scss']
})
export class BattleGridComponent implements OnInit {
  @Input() public grid = [];
  @Input() private selectLength = 2;

  @Output() public shipPlaced: EventEmitter<GridCell[]> = new EventEmitter();

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
    let cells = [];
    if (this.selectIsHorizontal) {
      cells = this.getHorizontalNeighbours(cell);
    } else {
      cells = this.getVerticalNeighbours(cell);
    }

    if (cells.length === this.selectLength && this.selectLength !== 0 && !cell.value) {
      this.unselectCells(cell);
      cells.map((c) => (c.value = this.selectLength));
      this.shipPlaced.emit(cells);
    }
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

    if (cell && cell.value) {
      cellClass = cellClass.concat(' ', `size-${cell.value}`);
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
