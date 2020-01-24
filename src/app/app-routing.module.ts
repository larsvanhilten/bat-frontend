import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LobbySettingsComponent } from './views/lobby/settings/lobby-settings.component';
import { LobbyPlacementComponent } from './views/lobby/placement/lobby-placement.component';
import { AuthRedirectComponent } from './views/auth-redirect/auth-redirect.component';
import { GameComponent } from './views/game/game.component';
import { AuthGuard } from './shared/services/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error', component: HomeComponent },
  { path: 'auth', component: AuthRedirectComponent },
  {
    path: 'lobby',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'settings' },
      { path: 'settings', component: LobbySettingsComponent, canActivate: [AuthGuard] },
      { path: 'placement', component: LobbyPlacementComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'game/:username', component: GameComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
