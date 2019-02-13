import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MeasurementUnitComponent } from './measurement-unit.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: MeasurementUnitComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class MeasurementUnitRoutingModule { }
