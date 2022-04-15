import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayPhaseComponent } from './day-phase.component';

const routes: Routes = [
  { path: '', component: DayPhaseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayPhaseRoutingModule { }
