import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, Router, RouterModule } from "@angular/router";
import { OperationsComponent } from "./operations.component";
import { DetailsOperationsComponent } from "./details-operations/details-operations.component";
import { ItemsComponent } from "./items/items.component";
import { WorkComponent } from "./work/work.component";
import { MaterialComponent } from "./material/material.component";
import { ActividadesComponent } from "./actividades/actividades.component";

export const routes: Routes = [
  {
    path: "",
    component: OperationsComponent,
    children: [
      {
        path: "obra",
        component: WorkComponent
      },

      {
        path: "detalles",
        component: DetailsOperationsComponent
      },
      {
        path: "items",
        component: ItemsComponent
      },
      {
        path: "materiales",
        component: MaterialComponent
      },

      {
        path: "quejas",
        loadChildren:
          "../internal/complaints/complaints.module#ComplaintsModule"
      },
      {
        path: "actividades",
        component: ActividadesComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class OperationsRoutingModule {}
