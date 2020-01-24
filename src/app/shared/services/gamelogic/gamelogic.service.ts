import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { connect } from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { SocketEmitters, SocketResponses } from './events';
import { FireResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {
  private socket: SocketIOClient.Socket;

  public onErrorResponse(): Observable<object> {
    return fromEvent(this.socket, SocketResponses.ERROR_RESPONSE);
  }

  public connect(): Observable<void> {
    const token = localStorage.getItem('token');
    this.socket = connect(`${environment.logic_service}?token=${token}`);
    return fromEvent(this.socket, 'connect');
  }

  // @ts-ignore
  private emit(event: SocketEmitters, ...args): void {
    if (!this.isConnected) {
      this.connect()
        .pipe(take(1))
        .subscribe(() => this.socket.emit(event, args));
    } else {
      this.socket.emit(event, args);
    }
  }

  // TODO: confirm it works
  // also, replace emit and on, then remove connect() in placement-component
  // @ts-ignore
  private on(event: SocketResponses): Observable<unknown> {
    if (!this.isConnected) {
      return this.connect().pipe(mergeMap(() => fromEvent(this.socket, event)));
    }
    return fromEvent(this.socket, event);
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public start(grid: number[][], chatVoteTime: number): void {
    this.socket.emit(SocketEmitters.START, { grid, chatVoteTime });
  }

  public onStartResponse(): Observable<object> {
    return fromEvent(this.socket, SocketResponses.START_RESPONSE);
  }

  public getVotes(): void {
    this.socket.emit(SocketEmitters.VOTES);
  }

  public onVotesResponse(): Observable<object> {
    return fromEvent(this.socket, SocketResponses.VOTES_RESPONSE);
  }

  public fire(x: number, y: number): void {
    this.socket.emit(SocketEmitters.FIRE, x, y);
  }

  public onPlayerFireResponse(): Observable<FireResponse> {
    return fromEvent(this.socket, SocketResponses.PLAYER_FIRE_RESPONSE);
  }

  public onChatFireResponse(): Observable<object> {
    return fromEvent(this.socket, SocketResponses.CHAT_FIRE_RESPONSE);
  }

  public onWinnerResponse(): Observable<object> {
    return fromEvent(this.socket, SocketResponses.WINNER_RESPONSE);
  }

  public get isConnected(): boolean {
    return this.socket && this.socket.connected;
  }
}
