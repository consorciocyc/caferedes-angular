import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentActivitiesRoutingModule } from "./payment-activities-routing.module";
import { PaymentActivitiesComponent } from "./payment-activities.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Http } from "@angular/http/src/http";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { CustomFormsModule } from "ng2-validation";
import { PayComponent } from "./pay/pay.component";

@NgModule({
  imports: [
    CommonModule,
    PaymentActivitiesRoutingModule,
    HttpModule,
    FormsModule,
    NguiAutoCompleteModule,
    CustomFormsModule
  ],
  declarations: [PaymentActivitiesComponent, PayComponent]
})
export class PaymentActivitiesModule {}
