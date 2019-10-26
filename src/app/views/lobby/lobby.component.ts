import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public chatLink;

  constructor(private snackBar: MatSnackBar, private authService: AuthService) {}

  public ngOnInit(): void {
    const { username } = this.authService.token;
    const domain = window.location.hostname;
    this.chatLink = `${domain}/${username}`;
  }

  public formatThumb(value: number): string {
    return `${value}s`;
  }

  public copyLink(linkInput: HTMLInputElement): void {
    const selection = document.getSelection();
    const range = document.createRange();

    range.selectNode(linkInput);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
    selection.removeAllRanges();

    this.snackBar.open('Link copied', null, { duration: 2 * 1000 });
  }

  public startGame(): void {
    console.log('test');
    console.log(this.authService.token);
  }
}
