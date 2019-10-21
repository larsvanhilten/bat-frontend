import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export interface IdToken {
  aud: string;
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  username: string;
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public idToken: IdToken;
  public accessTokenExpiration: number;

  constructor(private router: Router) {}

  public login(): void {
    const { redirect_uri, client_id } = environment;
    const url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=openid`;
    window.location.href = url;
  }

  public logout(): void {
    // TODO: logout request to auth-service
    this.idToken = null;
    this.router.navigate(['/']);
  }

  public onLogin(data): void {
    const jwtHelperService = new JwtHelperService();
    const idToken = jwtHelperService.decodeToken(data.id_token);

    this.accessTokenExpiration = new Date().getTime() + (data.expires_in - 300) * 1000;
    this.idToken = {
      ...idToken,
      username: idToken.preferred_username
    };
    localStorage.setItem('expire_time', JSON.stringify(this.accessTokenExpiration));
    localStorage.setItem('id_token', JSON.stringify(this.idToken));
  }

  public initialize(): void {
    const accessTokenExpiration = JSON.parse(localStorage.getItem('expire_time'));
    const idToken = JSON.parse(localStorage.getItem('id_token'));

    if (idToken && accessTokenExpiration) {
      this.idToken = idToken;
      this.accessTokenExpiration = accessTokenExpiration;
      this.router.navigate(['lobby']);
    }
  }
}
