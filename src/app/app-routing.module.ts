import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'players',
    loadChildren: () => import('./pages/players/players.module').then(m => m.PlayersModule)
  },
  {
    path: 'assign-roles',
    loadChildren: () => import('./pages/assign-roles/assign-roles.module').then(m => m.AssignRolesModule)
  },
  {
    path: 'night-phase',
    loadChildren: () => import('./pages/night-phase/night-phase.module').then(m => m.NightPhaseModule)
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
