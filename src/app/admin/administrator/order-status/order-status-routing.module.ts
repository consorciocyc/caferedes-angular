import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusComponent } from './order-status.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: OrderStatusComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class OrderStatusRoutingModule { }
