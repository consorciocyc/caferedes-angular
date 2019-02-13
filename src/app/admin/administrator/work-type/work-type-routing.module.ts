import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTypeComponent } from './work-type.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: WorkTypeComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class WorkTypeRoutingModule { }
