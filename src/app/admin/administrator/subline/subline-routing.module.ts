import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SublineComponent } from './subline.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: SublineComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class SublineRoutingModule { }
