import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageV0PlayerRepo } from 'src/app/core/repository/localStorage/v0/player.repo';
import { NightPhaseRoutingModule } from './night-phase-routing.module';
import { NightPhaseComponent } from './night-phase.component';

const BASE_MODULES = [
  NightPhaseRoutingModule,
  TranslateModule,
  FormsModule,
  CommonModule
];
const COMPONENTS = [NightPhaseComponent];
const MATERIAL_MODULES = [
  MatRadioModule,
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
export class NightPhaseModule { }
