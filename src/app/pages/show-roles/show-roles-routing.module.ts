import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowRolesComponent } from './show-roles.component';

const routes: Routes = [
  { path: '', component: ShowRolesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRolesRoutingModule { }
