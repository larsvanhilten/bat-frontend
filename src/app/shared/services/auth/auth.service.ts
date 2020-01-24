import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export interface Token {
  exp: number;
  iat: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: Token;

  private jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(private router: Router) {}

  public login(): void {
    const { redirect_uri, client_id } = environment;
    const url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=openid`;
    window.location.href = url;
  }

  public logout(): void {
    // TODO: logout request to auth-service
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  public onLogin(data): void {
    this.token = this.jwtHelperService.decodeToken(data.token);
    localStorage.setItem('token', data.token);
  }

  public initialize(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = this.jwtHelperService.decodeToken(token);
    }
  }
}
