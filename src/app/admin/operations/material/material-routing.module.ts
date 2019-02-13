import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, Router, RouterModule } from "@angular/router";
import { MaterialComponent } from "./material.component";

export const routes: Routes = [{ path: "", component: MaterialComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class MaterialRoutingModule {}
