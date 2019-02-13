import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SublineComponent } from "./subline.component";
import { SublineRoutingModule } from "./subline-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
@NgModule({
  imports: [
    CommonModule,
    SublineRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class SublineModule {}
