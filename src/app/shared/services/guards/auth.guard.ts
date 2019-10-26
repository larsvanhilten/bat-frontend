import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  public canActivate(): boolean {
    const { token } = this.authService;
    const currentTime = new Date().getTime() / 1000;

    if (!token || currentTime > token.exp) {
      this.authService.logout();
      return false;
    }

    return true;
  }
}
