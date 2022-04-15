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
    path: 'show-roles',
    loadChildren: () => import('./pages/show-roles/show-roles.module').then(m => m.ShowRolesModule)
  },
  {
    path: 'night-phase',
    loadChildren: () => import('./pages/night-phase/night-phase.module').then(m => m.NightPhaseModule)
  },
  {
    path: 'manual-change',
    loadChildren: () => import('./pages/manual-change/manual-change.module').then(m => m.ManualChangeModule)
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
