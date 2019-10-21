import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LobbyComponent } from './views/lobby/lobby.component';
import { AuthRedirectComponent } from './views/auth-redirect/auth-redirect.component';
import { AuthGuard } from './shared/services/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error', component: HomeComponent },
  { path: 'auth', component: AuthRedirectComponent },
  { path: 'lobby', component: LobbyComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
