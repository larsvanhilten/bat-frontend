import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameLogicService } from 'src/app/shared/services/gamelogic/gamelogic.service';
import { FireResponse } from 'src/app/shared/services/gamelogic/interfaces';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  public playerGrid = [];
  public chatGrid = [];

  private subscriptions = new Subscription();

  constructor(private gamelogicService: GameLogicService) {}

  public ngOnInit(): void {
    const onErrorSubscription = this.gamelogicService.onErrorResponse().subscribe((response) => this.onErrorResponse(response));
    this.subscriptions.add(onErrorSubscription);

    const onPlayerFireSubscription = this.gamelogicService
      .onPlayerFireResponse()
      .subscribe((response) => this.onPlayerFireResponse(response));
    this.subscriptions.add(onPlayerFireSubscription);

    const onChatFireSubscription = this.gamelogicService.onChatFireResponse().subscribe((response) => this.onChatFireResponse(response));
    this.subscriptions.add(onChatFireSubscription);

    const onVotesSubscription = this.gamelogicService.onVotesResponse().subscribe((response) => this.onVotesResponse(response));
    this.subscriptions.add(onVotesSubscription);

    const onWinnerSubscription = this.gamelogicService.onWinnerResponse().subscribe((response) => this.onWinnerResponse(response));
    this.subscriptions.add(onWinnerSubscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public fire({ x, y }: { x: number; y: number }): void {
    this.gamelogicService.fire(x, y);
  }

  public onPlayerFireResponse(response: FireResponse): void {
    const { x, y } = response.coordinates;
    if (response.didHit) {
      this.playerGrid[y][x] = '*';
    } else {
      this.playerGrid[y][x] = 'o';
    }
  }

  public onChatFireResponse(response: any): void {
    console.log(response);
    const { x, y } = response.coordinates;
    if (response.didHit) {
      this.chatGrid[y][x] = '*';
    } else {
      this.chatGrid[y][x] = 'o';
    }
  }

  public getVotes(): void {
    this.gamelogicService.getVotes();
  }

  public onVotesResponse(response: any): void {
    console.log(response);
  }

  public onWinnerResponse(response: any): void {
    console.log(response);
  }

  public onErrorResponse(response: any): void {
    console.log(response);
  }
}
