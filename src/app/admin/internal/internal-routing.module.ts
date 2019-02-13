import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InternalComponent } from "./internal.component";
import { Routes, Router, RouterModule } from "@angular/router";
import { CanDeactivateGuard } from "../../services/Candeactive/can-deactive-guard.service";
import { DetailsComponent } from "./details/details.component";
import { WorkComponent } from "./work/work.component";
import { ItemsComponent } from "./items/items.component";
import { MaterialsComponent } from "./materials-internal/materials.component";
import { ActivitiesComponent } from "./activities/activities.component";
export const routes: Routes = [
  {
    path: "",
    component: InternalComponent,
    children: [
      {
        path: "obra",
        component: WorkComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: "detalles",
        component: DetailsComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: "items",
        component: ItemsComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: "materiales",
        component: MaterialsComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: "quejas",
        loadChildren: "./complaints/complaints.module#ComplaintsModule"
      },
      {
        path: "actividades",
        component: ActivitiesComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class InternalRoutingModule {}
