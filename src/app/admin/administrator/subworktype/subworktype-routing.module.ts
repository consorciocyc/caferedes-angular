import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubworktypeComponent } from './subworktype.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: SubworktypeComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class SubworktypeRoutingModule { }
