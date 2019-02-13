import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailsRoutingModule } from "./details-routing.module";
import { DetailsComponent } from "./details.component";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule,
    NguiAutoCompleteModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,

  ],
})
export class DetailsModule {}
