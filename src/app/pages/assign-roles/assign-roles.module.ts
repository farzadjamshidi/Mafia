import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageV0PlayerRepo } from 'src/app/core/repository/localStorage/v0/player.repo';
import { AssignRolesRoutingModule } from './assign-roles-routing.module';
import { AssignRolesComponent } from './assign-roles.component';

const BASE_MODULES = [
  AssignRolesRoutingModule,
  TranslateModule,
  ReactiveFormsModule,
  CommonModule
];
const COMPONENTS = [AssignRolesComponent];
const MATERIAL_MODULES = [
  MatCardModule
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MATERIAL_MODULES,
    ...BASE_MODULES
  ],
  exports: [
    ...MATERIAL_MODULES,
    ...COMPONENTS
  ],
  providers: [
    { provide: 'IPlayerRepo', useClass: LocalStorageV0PlayerRepo }
  ]
})
export class AssignRolesModule { }
