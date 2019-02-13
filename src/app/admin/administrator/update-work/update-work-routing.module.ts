import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateWorkComponent } from './update-work.component';
import { Routes, Router, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: UpdateWorkComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class UpdateWorkRoutingModule { }
