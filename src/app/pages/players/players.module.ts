import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageV0PlayerRepo } from 'src/app/core/repository/localStorage/v0/player.repo';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';

const BASE_MODULES = [
  PlayersRoutingModule,
  TranslateModule,
  ReactiveFormsModule,
  CommonModule
];
const COMPONENTS = [PlayersComponent];
const MATERIAL_MODULES = [
  MatInputModule,
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
export class PlayersModule { }
