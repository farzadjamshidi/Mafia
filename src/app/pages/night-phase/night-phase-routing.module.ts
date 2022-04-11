import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NightPhaseComponent } from './night-phase.component';

const routes: Routes = [
  { path: '', component: NightPhaseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NightPhaseRoutingModule { }
