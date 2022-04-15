import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualChangeComponent } from './manual-change.component';

const routes: Routes = [
  { path: '', component: ManualChangeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualChangeRoutingModule { }
