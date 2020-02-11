import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { StocksComponent } from './stocks/stocks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StocksComponent }
    ]),
    ReactiveFormsModule,
    MaterialModule,
    SharedUiChartModule
  ],
  declarations: [StocksComponent]
})
export class StocksFeatureShellModule {}
