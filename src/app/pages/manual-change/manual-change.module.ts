import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageV0PlayerRepo } from 'src/app/core/repository/localStorage/v0/player.repo';
import { ManualChangeRoutingModule } from './manual-change-routing.module';
import { ManualChangeComponent } from './manual-change.component';

const BASE_MODULES = [
  ManualChangeRoutingModule,
  TranslateModule,
  FormsModule,
  CommonModule
];
const COMPONENTS = [ManualChangeComponent];
const MATERIAL_MODULES = [
  MatSnackBarModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
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
export class ManualChangeModule { }
