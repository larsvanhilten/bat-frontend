import { Component, HostListener, OnDestroy } from '@angular/core';
import { Ship, GridCell } from 'src/app/shared/components/battle-grid/battle-grid.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameLogicService } from 'src/app/shared/services/gamelogic/gamelogic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './lobby-placement.component.html',
  styleUrls: ['./lobby-placement.component.scss']
})
export class LobbyPlacementComponent implements OnDestroy {
  public placeHorizontal = true;
  public selectLength = 0;
  public ships = [6, 4, 4, 3, 3, 3, 2, 2, 2, 2];
  public grid = [];

  private subscriptions = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private gameLogicService: GameLogicService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public startGame(): void {
    if (this.ships.length !== 0) {
      this.snackBar.open('Please place all your ships');
      return;
    }

    this.gameLogicService.connect().subscribe(() => {
      const onErrorSubscription = this.gameLogicService.onErrorResponse().subscribe((error: Error) => {
        this.snackBar.open(error.message);
      });
      this.subscriptions.add(onErrorSubscription);

      const onStartSubscription = this.gameLogicService.onStartResponse().subscribe((response) => {
        const { username } = this.authService.token;
        this.router.navigate([`game/${username}`]);
      });
      this.subscriptions.add(onStartSubscription);

      const serializedGrid = this.serializeGrid();
      const chatVoteTime = parseInt(this.route.snapshot.paramMap.get('chatVoteTime'), 10);
      this.gameLogicService.start(serializedGrid, chatVoteTime);
    });
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

  @HostListener('document:keypress', ['$event'])
  public onKeypress(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === 'r') {
      this.placeHorizontal = !this.placeHorizontal;
    }
  }

  private serializeGrid(): number[][] {
    // Remove first and last row (number/alphabet cells)
    const grid = this.grid.map((row) => row.filter((cell, index) => index !== 0));
    grid.splice(0, 1);

    return grid.map((row) => {
      return row.map((cell: GridCell, index: number) => {
        const { ship } = cell;
        if (!ship) {
          return '~';
        }

        if (ship.isHorizontal && cell.x === ship.start) {
          return '<';
        }

        if (!ship.isHorizontal && cell.y === ship.start) {
          return '^';
        }

        if (ship.isHorizontal) {
          return '-';
        }

        if (!ship.isHorizontal) {
          return '|';
        }
      });
    });
  }
}
