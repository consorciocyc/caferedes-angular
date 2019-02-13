import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpresionComponent } from './impresion.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: ImpresionComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ImpresionRoutingModule { }
