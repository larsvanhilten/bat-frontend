import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './auth-redirect.component.html',
  styleUrls: ['./auth-redirect.component.scss']
})
export class AuthRedirectComponent implements OnInit {
  private authApi: string = environment.auth_service;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private authService: AuthService) {}

  public ngOnInit(): void {
    this.route.queryParamMap.subscribe((query) => {
      const code = query.get('code');
      if (code) {
        this.http
          .post(`${this.authApi}/auth`, { code })
          .subscribe((response) => this.onSuccessResponse(response), () => this.errorRedirect());
        return;
      }
      this.errorRedirect();
    });
  }

  private onSuccessResponse(response): void {
    const { data } = response;
    this.authService.onLogin(data);
    this.router.navigate(['lobby']);
  }

  private errorRedirect(): void {
    this.router.navigate(['error']);
  }
}
