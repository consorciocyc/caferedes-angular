import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { Router, Routes, RouterModule } from "@angular/router";
import {CanDeactivateGuard} from './services/Candeactive/can-deactive-guard.service'

const routes: Routes = [
  { path: "", loadChildren: "./login/login.module#LoginModule" },
  { path: "login", loadChildren: "./login/login.module#LoginModule" },
  {
    path: "not-found",
    loadChildren: "./not-found/not-found.module#NotFoundModule"
  },
  { path: "admin", loadChildren: "./admin/admin.module#AdminModule" },
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ 
    CanDeactivateGuard,
  
],
  declarations: []
})
export class AppRoutingModule {}
