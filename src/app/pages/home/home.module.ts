import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

const BASE_MODULES = [
  HomeRoutingModule,
  TranslateModule,
  ReactiveFormsModule,
  CommonModule
];
const COMPONENTS = [HomeComponent];
const MATERIAL_MODULES = [
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
  ]
})
export class HomeModule { }
