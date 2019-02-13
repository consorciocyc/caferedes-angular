import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user.component";

const routes: Routes = [{ path: "", component: UserComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class UserRoutingModule {}
