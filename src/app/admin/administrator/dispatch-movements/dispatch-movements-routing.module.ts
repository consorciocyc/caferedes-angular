import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispatchMovementsComponent } from './dispatch-movements.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: DispatchMovementsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class DispatchMovementsRoutingModule { }
