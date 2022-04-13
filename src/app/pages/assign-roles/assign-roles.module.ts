import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageV0PlayerRepo } from 'src/app/core/repository/localStorage/v0/player.repo';
import { AssignRolesRoutingModule } from './assign-roles-routing.module';
import { AssignRolesComponent } from './assign-roles.component';

const BASE_MODULES = [
  AssignRolesRoutingModule,
  TranslateModule,
  FormsModule,
  CommonModule
];
const COMPONENTS = [AssignRolesComponent];
const MATERIAL_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
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
