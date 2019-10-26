import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    const { token } = this.authService;
    if (token) {
      this.router.navigate(['lobby']);
    }
  }

  public login(): void {
    this.authService.login();
  }
}
