import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignRolesComponent } from './assign-roles.component';

const routes: Routes = [
  { path: '', component: AssignRolesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignRolesRoutingModule { }
