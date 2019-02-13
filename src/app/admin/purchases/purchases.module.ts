import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PurchasesRoutingModule } from "./purchases-routing.module";
import { PurchasesComponent } from "./purchases.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Http } from "@angular/http/src/http";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    HttpModule,
    FormsModule,
    NguiAutoCompleteModule,
    CustomFormsModule
  ],
  declarations: [PurchasesComponent]
})
export class PurchasesModule {}
