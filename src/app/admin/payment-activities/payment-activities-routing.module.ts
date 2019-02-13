import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, Router, RouterModule } from "@angular/router";
import { PaymentActivitiesComponent } from "./payment-activities.component";
import { PayComponent } from "./pay/pay.component";

export const routes: Routes = [
  {
    path: "",
    component: PaymentActivitiesComponent,
    children: [
      {
        path: "pay",
        component: PayComponent
      }
    ]
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class PaymentActivitiesRoutingModule {}
