import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GactivitiesComponent } from './gactivities.component';
import { Router, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: GactivitiesComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class GactivitiesRoutingModule { }


