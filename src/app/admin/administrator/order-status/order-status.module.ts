import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderStatusComponent } from "./order-status.component";
import { OrderStatusRoutingModule } from "./order-status-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";


@NgModule({
  imports: [
    CommonModule,
    OrderStatusRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class OrderStatusModule {}
