import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule, MatNativeDateModule,
  MatSelectModule
} from '@angular/material';

const MATERIAL_COMPONENTS = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  imports: [ MATERIAL_COMPONENTS ],
  exports: [ MATERIAL_COMPONENTS ]
})
export class MaterialModule {

}
