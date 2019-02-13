import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispatchDestinationComponent } from './dispatch-destination.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: DispatchDestinationComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class DispatchDestinationRoutingModule { }
