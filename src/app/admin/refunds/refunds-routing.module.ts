import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { RefundsComponent } from './refunds.component';

const routes: Routes = [
  { path: '', component: RefundsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RefundsRoutingModule { }
