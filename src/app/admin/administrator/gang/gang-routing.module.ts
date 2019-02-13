import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GangComponent } from './gang.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: GangComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class GangRoutingModule { }
