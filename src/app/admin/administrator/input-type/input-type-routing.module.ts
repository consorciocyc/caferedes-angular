import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTypeComponent } from './input-type.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: InputTypeComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class InputTypeRoutingModule { }
