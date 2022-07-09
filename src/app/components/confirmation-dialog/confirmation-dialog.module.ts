import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";


const BASE_MODULES = [
  CommonModule,
  TranslateModule
];
const COMPONENTS = [ConfirmationDialogComponent];
const MATERIAL_MODULES = [
  MatButtonModule,
  MatDialogModule
];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [...BASE_MODULES, ...MATERIAL_MODULES],
  exports: [...BASE_MODULES, ...MATERIAL_MODULES, ...COMPONENTS],
})
export class ConfirmationDialogModule { }
