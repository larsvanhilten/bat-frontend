import { Component, OnInit, Input, HostListener } from '@angular/core';

export interface GridCell {
  isSelected: boolean;
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

  private selectIsHorizontal = true;
  private currentCell;

  constructor() {}

  public ngOnInit(): void {
    this.createGrid(10, 10);
  }

  private createGrid(x, y): void {
    for (let i = 0; i < x; i++) {
      this.grid[i] = [];
      for (let j = 0; j < y; j++) {
        const cell: GridCell = { isSelected: false, x: i, y: j };
        this.grid[i][j] = cell;
      }
    }
  }

  public onCellClick(cell: GridCell): void {
    console.log(this.grid);
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
    if (cell && cell.isSelected) {
      return 'cell hover';
    }
    return 'cell';
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
    if (event.key === 'r' || event.key === 'R') {
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
      if (c) {
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
      if (c) {
        cells.push(c);
      }
    }
    return cells;
  }
}
