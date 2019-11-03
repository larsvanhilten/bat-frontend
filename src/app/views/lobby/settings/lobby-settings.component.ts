import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './lobby-settings.component.html',
  styleUrls: ['./lobby-settings.component.scss']
})
export class LobbySettingsComponent implements OnInit {
  public chatLink;

  constructor(private snackBar: MatSnackBar, private authService: AuthService, private router: Router) {}

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
    this.snackBar.open('Link copied');
  }

  public startGame(): void {
    this.router.navigate(['lobby/placement']);
  }
}
