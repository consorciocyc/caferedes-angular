import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IncomeRoutingModule } from "./income-routing.module";
import { IncomeComponent } from "./income.component";
import { Http } from "@angular/http/src/http";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
import { FormsModule } from "@angular/forms";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";

@NgModule({
  imports: [
    CommonModule,
    IncomeRoutingModule,
    HttpModule,
    CustomFormsModule,
    FormsModule,
    NguiAutoCompleteModule
  ],
  declarations: [IncomeComponent]
})
export class IncomeModule {}
